import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';
import { AttachmentService } from 'src/app/service/attachment.service';
import { Router } from '@angular/router';
import { LiveSessionChatService } from 'src/app/service/live-session-chat.service';
import { Detect_URL } from 'src/app/utilities/detect_url';
import { Subscription } from 'rxjs';
import { Calculate_time } from 'src/app/utilities/calculate_color';
import { interval } from 'rxjs/internal/observable/interval';

@Component({
  selector: 'app-live-session-multi',
  templateUrl: './live-session-multi.component.html',
  styleUrls: ['./live-session-multi.component.scss'],
})
export class LiveSessionMultiComponent implements OnInit {
  spinner: boolean = false;
  user: any;
  batch: any;
  selected_batch: any;
  active_student_list: any[] = [];
  transfer_admin: any[];
  files: any[] = [];
  end_all_chat_button: boolean;
  @ViewChild('sound') sound: ElementRef;
  display: boolean = false;
  slots: any[] = [];
  replace: any;
  temp_student: any;
  last_index: number;
  admin_id: string = localStorage.getItem('uid');
  interval: Subscription;

  constructor(
    private chat_service: ChatService,
    private router: Router,
    private user_service: UserService,
    private attachment_service: AttachmentService,
    private live_session_chat_service: LiveSessionChatService
  ) {
    // assign chat to admin
    this.live_session_chat_service.assign_chat().subscribe((res) => {
      this.active_student_list.forEach((stu) => {
        if (res.chat_id === stu._id) {
          stu.sme_id = res.sme_id;
        }
      });
      this.filter_data();
    });

    // new message
    this.live_session_chat_service.new_message_received().subscribe((res) => {
      const index = this.slots.findIndex(
        (ch) => ch.chat._id == res.chat.chat_id
      );
      this.sound.nativeElement.pause();
      this.sound.nativeElement.currentTime = 0;
      if (res.message.sender_type !== 'admin' && index > -1) {
        this.sound.nativeElement.play();
      }

      // if chat is in slots then push message
      if (index > -1) {
        const check = this.slots[index].message.findIndex(
          (ch) => ch.date == res.message.created_at.split('T')[0]
        );

        if (check > -1) {
          this.slots[index].message[check].message.push(res.message);

          this.slots[index].message_sending = false;
        } else {
          this.slots[index].message.push({
            date: res.message.created_at.split('T')[0],
            message: [res.message],
          });
        }

        setTimeout(() => {
          this.scroll_chat_container(index);
        }, 20);
      }
      this.sorting(this.active_student_list);
    });

    // increment counter
    this.live_session_chat_service
      .increment_admin_counter()
      .subscribe((res) => {
        this.active_student_list = this.active_student_list.map((stu) => {
          if (stu._id === res.chat_id) {
            stu.admin_unread_count = res.admin_unread_count + 1;
            stu.updatedAt = new Date();
            stu.last_message = res.last_message;
          } else {
            stu.admin_unread_count = stu.admin_unread_count;
          }
          return stu;
        });
        this.sorting(this.active_student_list);
      });

    // end chat
    this.live_session_chat_service.end_chat().subscribe((res) => {
      res.forEach((element) => {
        const dest = this.active_student_list.find(
          (chats) => chats._id === element._id
        );
        if (dest) {
          dest.sme_id = null;
        } else {
          element.sme_id = null;
          this.active_student_list.push(element);
        }
      });
      this.spinner = false;
      this.sorting(this.active_student_list);
    });

    // transfer chat
    this.live_session_chat_service.transfer_chat().subscribe((res) => {
      if (res.sme_id === localStorage.getItem('uid')) {
        this.active_student_list.push(res);
        this.sorting(this.active_student_list);
      }
      this.spinner = false;
    });
  }

  sorting(data) {
    this.active_student_list.sort((a, b) => b.updatedAt - a.updatedAt);
    this.active_student_list = Calculate_time(this.active_student_list);

    const timer = interval(2000);

    this.interval = timer.subscribe(() => {
      this.active_student_list = Calculate_time(this.active_student_list);
    });
  }

  filter_data() {
    this.active_student_list = this.active_student_list.filter(
      (stu) => stu.sme_id === localStorage.getItem('uid') || stu.sme_id == null
    );

    // remove chat if selected chat is taken by someone admin
    this.slots.forEach((chat, index) => {
      if (chat.chat.sme_id !== localStorage.getItem('uid')) {
        this.slots.splice(index, 1);
      }
    });

    this.spinner = false;

    setTimeout(() => {
      this.scroll_chat_container();
    }, 100);
  }

  scroll_chat_container(index?) {
    const div = document.querySelectorAll('.chat-body');
    if (div != null) {
      if (index) {
        div[index].scrollTop =
          div[index].scrollHeight - div[index].clientHeight;
      } else {
        div.forEach((tag) => {
          tag.scrollTop = tag.scrollHeight - tag.clientHeight;
        });
      }
    } else {
      setTimeout(() => {
        this.scroll_chat_container(index);
      }, 200);
    }
  }

  get_admin_batch() {
    this.user_service.get_admin_batch_details().subscribe(
      (res: any) => {
        const data = res.data;
        this.user = data;
        this.batch = data.batch_ids;
      },
      (error) => {
        this.error_handler(error);
      }
    );
  }

  // after batch select get all the student list
  get_all_student_chat() {
    this.spinner = true;

    this.slots = [];
    this.chat_service.get_batch_chat(this.selected_batch._id).subscribe(
      (res: any) => {
        this.active_student_list = res.data;
        this.sorting(this.active_student_list);
        this.spinner = false;
      },
      (error) => this.error_handler(error)
    );
  }

  error_handler(error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.errorMessage,
    }).then(() => {
      this.spinner = false;
      this.router.navigate(['/main']);
    });
  }

  findIndex(chat) {
    return this.slots.findIndex((ch) => ch.chat._id == chat._id);
  }

  // after student selected check slot
  check_slot(student) {
    this.temp_student = student;
    if (this.slots.length <= 2) {
      this.get_selected_student_chat(student);
    } else {
      this.findIndex(student) == -1 ? (this.display = true) : '';
    }
  }

  group_by_date(data) {
    const groups = data.reduce((groups, game) => {
      const date = game.created_at.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(game);
      return groups;
    }, {});

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        message: groups[date],
      };
    });
    return groupArrays;
  }

  // get selected students chats
  get_selected_student_chat(student) {
    this.spinner = true;
    // joining room
    if (student.sme_id === localStorage.getItem('uid')) {
      this.live_session_chat_service.join_room({
        room_id: student.student_id + student.batch_id,
      });
    }
    this.chat_service.get_selected_studentChat(student._id).subscribe(
      (res: any) => {
        const response = res.data;

        this.slots.push({
          chat: student,
          message: this.group_by_date(response.message),
          files: [],
          message_sending: false,
        });

        setTimeout(() => {
          this.scroll_chat_container();
        }, 40);

        this.spinner = false;
      },
      (error) => this.error_handler(error)
    );
  }

  // attachment
  attchment(event, index, stu) {
    this.files = [];
    for (let i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
    this.slots[this.last_index].files = this.files;
  }

  replace_chat() {
    const index = this.findIndex(this.replace.chat);
    this.live_session_chat_service.leave({
      room_id: this.temp_student.student_id + this.temp_student.batch_id,
    });
    this.slots.splice(index, 1);
    this.display = false;
    this.live_session_chat_service.leave({
      room_id: this.replace.chat.student_id + this.replace.chat.batch_id,
    });
    this.get_selected_student_chat(this.temp_student);
    this.replace = '';
  }

  // for transfer
  get_all_admin() {
    this.spinner = true;
    this.user_service.get_all_admin().subscribe(
      (res: any) => {
        this.transfer_admin = res.data;
        this.spinner = false;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage,
        }).then(() => {
          this.spinner = false;
          this.router.navigate(['/main']);
        });
      }
    );
  }

  open_files(ch) {
    const files: NodeListOf<Element> = document.querySelectorAll('.files');

    this.last_index = ch;

    // @ts-ignore
    files[0].click();
  }

  async send_message(textarea, index) {
    const html = Detect_URL(textarea.value);

    const message_obj = {
      text_message: html,
      sme_id: localStorage.getItem('uid'),
      sender_name: this.user.name,
      sender_type: 'admin',
      attachment: [],
      created_at: new Date(),
    };

    try {
      const data = {
        room_id:
          this.slots[index].chat.student_id + this.slots[index].chat.batch_id,
        chat_id: this.slots[index].chat._id,
      };
      if (this.slots[index].files.length > 0) {
        this.slots[index].message_sending = true;
        const files: any = await this.attachment_service.upload_files(
          this.files
        );
        message_obj['attachment'] = FormativeData.concat_url_with_files(
          files.files_paths
        );
      }
      // this.slots[index].message.push(message_obj);
      textarea.value = '';

      setTimeout(() => {
        this.scroll_chat_container(index);
      }, 50);
      this.live_session_chat_service.send_message(message_obj, data);
      this.slots[index].files = [];
    } catch (error) {
      // console.log(error);
    }
  }

  end_chat(stu, index) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to end this chat',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.spinner = true;
        this.live_session_chat_service.leave({
          room_id: stu.chat.student_id + stu.chat.batch_id,
        });
        this.live_session_chat_service.end_all_chat([stu.chat]);
        this.slots.splice(index, 1);
        setTimeout(() => {
          this.scroll_chat_container();
        }, 40);
      }
    });
  }

  assign_chat_to_admin(stu, index) {
    this.spinner = true;
    const data = {
      chat_id: stu.chat._id,
      sme_id: localStorage.getItem('uid'),
    };

    this.live_session_chat_service.join_room({
      room_id: stu.chat.student_id + stu.chat.batch_id,
    });
    this.live_session_chat_service.assign_chat_to_admin(data);
  }

  close_chat(i) {
    this.slots.splice(i, 1);
  }

  ngOnInit(): void {
    this.get_admin_batch();
    this.get_all_admin();
  }

  ngOnDestroy(): void {
    this.live_session_chat_service.remove_listen();
    this.interval ? this.interval.unsubscribe() : '';
  }
}
