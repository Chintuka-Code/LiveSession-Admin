import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BatchService } from 'src/app/service/batch.service';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';
import { AttachmentService } from 'src/app/service/attachment.service';
import { Router } from '@angular/router';
import { LiveSessionChatService } from 'src/app/service/live-session-chat.service';
import { QUILL_TOOLBAR_SETTING } from 'src/app/utilities/quill_setting';
import 'quill-emoji/dist/quill-emoji.js';
import { Detect_URL } from 'src/app/utilities/detect_url';
import { Calculate_time } from 'src/app/utilities/calculate_color';
import { interval, Observable, Subscription } from 'rxjs';
import { LogService } from 'src/app/service/log.service';
import { create_log } from 'src/app/utilities/log';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';

@Component({
  selector: 'app-live-session-chat',
  templateUrl: './live-session-chat.component.html',
  styleUrls: ['./live-session-chat.component.scss'],
})
export class LiveSessionChatComponent implements OnInit {
  groupedCities: any[];
  spinner: boolean = false;
  user: any;
  batch: any;
  selected_batch: any;
  active_student_list: any[] = [];
  selected_student: any;
  selected_student_chat_message: any[] = [];
  has_sme: boolean = false;
  admin_id: string = localStorage.getItem('uid');
  @ViewChild('textarea') textarea: ElementRef;
  transfer_admin: any[];
  files: any[] = [];
  message_sending: boolean = false;
  end_all_chat_button: boolean;
  @ViewChild('sound') sound: ElementRef;
  modules = {};
  text: any;
  interval: Subscription;
  slots: any[] = [];

  manual_check_available_chat: Subscription;

  constructor(
    private chat_service: ChatService,
    private router: Router,
    private user_service: UserService,
    private attachment_service: AttachmentService,
    private live_session_chat_service: LiveSessionChatService,
    private log_service: LogService
  ) {
    this.modules = QUILL_TOOLBAR_SETTING;
    // assign chat to admin
    this.live_session_chat_service.assign_chat().subscribe((res) => {
      this.active_student_list.forEach((stu) => {
        if (res.chat_id === stu._id) {
          stu.sme_id = res.sme_id;
        }
      });

      this.filter_data();
    });

    // new chat
    this.live_session_chat_service.new_chat().subscribe((res) => {
      // console.log(this.selected_batch);
      if (this.selected_batch && res.batch_id === this.selected_batch._id) {
        this.sound.nativeElement.pause();
        this.sound.nativeElement.currentTime = 0;
        this.sound.nativeElement.play();
        this.active_student_list.push(res);
      }
    });

    // new message
    this.live_session_chat_service.new_message_received().subscribe((res) => {
      this.sound.nativeElement.pause();
      this.sound.nativeElement.currentTime = 0;
      if (res.message.sender_type !== 'admin') {
        this.sound.nativeElement.play();
      }

      if (this.selected_student_chat_message) {
        const index = this.selected_student_chat_message.findIndex(
          (ch) => ch.date == res.message.created_at.split('T')[0]
        );

        if (index > -1) {
          this.selected_student_chat_message[index].message.push(res.message);
        } else {
          this.selected_student_chat_message.push({
            date: res.message.created_at.split('T')[0],
            message: [res.message],
          });
        }

        this.message_sending = false;
        // console.log(res.message);
      }

      // update admin read counter
      this.active_student_list.forEach((stu) => {
        if (stu._id === this.selected_student._id) {
          stu.admin_unread_count = 0;
        }
      });

      this.sorting(this.active_student_list);
      setTimeout(() => {
        this.scroll_chat_container();
      }, 50);
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
            stu.is_todays_first = res.is_todays_first;
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
        const index = this.active_student_list.findIndex(
          (chat) => chat._id === element._id
        );
        if (index) {
          this.active_student_list.splice(index, 1);
        }
      });
      this.spinner = false;
      this.sorting(this.active_student_list);
    });

    // // transfer chat
    // this.live_session_chat_service.transfer_chat().subscribe((res) => {
    //   console.log('transfer');
    //   if (res.sme_id === localStorage.getItem('uid')) {
    //     this.active_student_list.push(res);
    //     this.sorting(this.active_student_list);
    //   }
    //   this.spinner = false;
    // });

    // transfer chat
    this.live_session_chat_service.transfer_chat().subscribe((res) => {
      if (this.selected_batch && res.sme_id === localStorage.getItem('uid')) {
        this.active_student_list.push(res);
        this.sorting(this.active_student_list);
      } else {
        const index = this.active_student_list.findIndex(
          (chat) => chat._id === res._id
        );
        this.active_student_list.splice(index, 1);
      }
      this.spinner = false;
    });
  }

  changedEditor(event) {
    // console.log(event);
  }

  filter_data() {
    this.active_student_list = this.active_student_list.filter(
      (stu) => stu.sme_id === localStorage.getItem('uid') || stu.sme_id == null
    );

    if (this.selected_student.sme_id !== localStorage.getItem('uid')) {
      this.selected_student = '';
    }
    this.spinner = false;

    setTimeout(() => {
      this.scroll_chat_container();
    }, 100);
  }

  sorting(data) {
    this.active_student_list.sort((a, b) => b.updatedAt - a.updatedAt);
    // calculate first time response
    this.active_student_list = Calculate_time(this.active_student_list);

    const timer = interval(2000);

    this.interval = timer.subscribe(() => {
      this.active_student_list = Calculate_time(this.active_student_list);
      // console.log(this.active_student_list);
    });
  }

  // arrange data into date-wise
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
    this.selected_student_chat_message = groupArrays;
    this.spinner = false;
  }

  textarea_auto_increment(event) {
    const tx = event.target;
    tx.style.height = 'auto';
    tx.style.height = tx.scrollHeight + 'px';
  }

  // Scroll chat
  scroll_chat_container() {
    const div = document.getElementById('chat-body');
    if (div != null) {
      div.scrollTop = div.scrollHeight - div.clientHeight;
    } else {
      setTimeout(() => {
        this.scroll_chat_container();
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

  // after batch select get all the student list
  get_all_student_chat() {
    this.spinner = true;
    this.selected_student = '';
    this.selected_student_chat_message = [];
    this.chat_service.get_batch_chat(this.selected_batch._id).subscribe(
      (res: any) => {
        const batch_name = this.batch.filter(
          (batch) => batch._id === this.selected_batch._id
        );
        create_log(
          {
            html_content: `<p>
            <a href=""> ${this.user.name} </a> has opened batch <a href=""> ${batch_name[0].batch_name} </a>  chat in Single Window Agent mode
          </p>`,
            created_at: new Date(),
            chat_id: null,
            log_code: '#CHAT',
            user_id: localStorage.getItem('uid'),
            batch_id: this.selected_batch._id,
          },
          this.log_service
        );
        this.active_student_list = res.data;
        this.sorting(this.active_student_list);
        console.log(this.active_student_list);
        this.spinner = false;
        const timer = interval(120000);

        this.manual_check_available_chat = timer.subscribe(() =>
          this.check_available_chat()
        );
      },
      (error) => this.error_handler(error)
    );
  }

  check_available_chat() {
    this.chat_service.get_batch_chat(this.selected_batch._id).subscribe(
      (res: any) => {
        this.active_student_list = res.data;
        this.sorting(this.active_student_list);
        this.spinner = false;
      },
      (error) => this.error_handler(error)
    );
  }

  // after student selected get their chat
  get_selected_student_chat(student) {
    this.spinner = true;

    if (this.selected_student) {
      this.live_session_chat_service.leave({
        room_id:
          this.selected_student.student_id + this.selected_student.batch_id,
      });
    }
    this.selected_student = '';
    this.selected_student = student;

    if (this.selected_student.sme_id === localStorage.getItem('uid')) {
      this.live_session_chat_service.join_room({
        room_id:
          this.selected_student.student_id + this.selected_student.batch_id,
      });
    }

    this.chat_service
      .get_selected_studentChat(this.selected_student._id)
      .subscribe(
        (res: any) => {
          const batch_name = this.batch.filter(
            (batch) => batch._id === this.selected_batch._id
          );
          create_log(
            {
              html_content: `<p>
              <a href=""> ${this.user.name} </a> has opened Student:- <a href=""> ${student.student_name} </a>  chat in single window agent mode
              </p> <div> <strong> Batch-Name :- </strong> <small> ${batch_name[0].batch_name}  </small> </div> `,
              created_at: new Date(),
              chat_id: student._id,
              log_code: '#CHAT',
              user_id: localStorage.getItem('uid'),
              batch_id: student.batch_id,
            },
            this.log_service
          );
          const response = res.data;
          this.selected_student_chat_message = response.message;
          this.scroll_chat_container();
          this.group_by_date(this.selected_student_chat_message);
        },
        (error) => this.error_handler(error)
      );
  }

  assign_chat_to_admin() {
    this.spinner = true;
    const data = {
      chat_id: this.selected_student._id,
      sme_id: localStorage.getItem('uid'),
    };

    this.live_session_chat_service.join_room({
      room_id:
        this.selected_student.student_id + this.selected_student.batch_id,
    });
    this.live_session_chat_service.assign_chat_to_admin(data);
  }

  // attachment
  attchment(event) {
    this.files = [];
    for (let i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
  }

  // send message
  async send_message(text) {
    this.message_sending = true;
    const message_obj = {
      text_message: Detect_URL(text.value),
      sme_id: localStorage.getItem('uid'),
      sender_name: this.user.name,
      sender_type: 'admin',
      attachment: [],
      created_at: new Date(),
    };

    const data = {
      room_id:
        this.selected_student.student_id + this.selected_student.batch_id,
      chat_id: this.selected_student._id,
      chat: this.selected_student,
    };
    this.text = '';
    try {
      if (this.files.length > 0) {
        const files: any = await this.attachment_service.upload_files(
          this.files
        );
        message_obj['attachment'] = FormativeData.concat_url_with_files(
          files.files_paths
        );
      }
      // this.selected_student_chat_message.push(message_obj);
      setTimeout(() => {
        this.scroll_chat_container();
      }, 50);
      const batch_name = this.batch.filter(
        (batch) => batch._id === this.selected_batch._id
      );
      create_log(
        {
          html_content: `<p>
          <a href=""> ${this.user.name} </a> sent a message to:- <a href=""> ${this.selected_student.student_name} </a>  from single window agent mode
          </p> <div> <strong> Batch-Name :- </strong> <small> ${batch_name[0].batch_name}  </small> </div> `,
          created_at: new Date(),
          chat_id: this.selected_student._id,
          log_code: '#CHAT',
          user_id: localStorage.getItem('uid'),
          batch_id: this.selected_student.batch_id,
        },
        this.log_service
      );
      this.live_session_chat_service.send_message(message_obj, data);

      this.files = [];
      this.textarea.nativeElement.value = '';
    } catch (error) {
      // console.log(error);
    }
  }

  end_chat() {
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
        this.selected_student_chat_message = [];
        this.live_session_chat_service.leave({
          room_id:
            this.selected_student.student_id + this.selected_student.batch_id,
        });
        this.live_session_chat_service.end_all_chat([this.selected_student]);
        const index = this.active_student_list.findIndex(
          (chat) => chat._id === this.selected_student._id
        );
        this.active_student_list.splice(index, 1);
        const pre = this.transfer_admin.filter(
          (admin) => admin._id === this.selected_student.sme_id
        );
        create_log(
          {
            html_content: `<p>
            <a href=""> ${this.user.name} </a> has ended  <a href="">${this.selected_student.student_name}</a> chat from single window agent mode
          </p> <strong>Previous Sme</strong> <small>  ${pre[0].name}  </small>  `,
            created_at: new Date(),
            chat_id: this.selected_student._id,
            log_code: '#CHAT',
            user_id: localStorage.getItem('uid'),
            batch_id: this.selected_student.batch_id,
          },
          this.log_service
        );
        this.selected_student = '';
        this.spinner = false;
      }
    });
  }

  transfer_chat(doc) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to transfer this chat',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.spinner = true;
        const new_sme = this.transfer_admin.filter(
          (admin) => admin._id === doc.value
        );

        const pre = this.transfer_admin.filter(
          (admin) => admin._id === this.selected_student.sme_id
        );

        const batch_name = this.batch.filter(
          (batch) => batch._id === this.selected_batch._id
        );

        create_log(
          {
            html_content: `<p>
            <a href=""> ${this.user.name} </a> has transferred  <a href=""> ${this.selected_student.student_name}</a> chat from ${pre[0].name} to ${new_sme[0].name} in the single window agent mode
          </p> <strong>Previous Sme</strong> <small> ${pre[0].name} </small> 
          <strong>New Sme</strong> <small> ${new_sme[0].name} </small>     <strong>Batch-Name</strong> <small> ${batch_name[0].batch_name} </small>  `,
            created_at: new Date(),
            chat_id: this.selected_student._id,
            log_code: '#CHAT',
            user_id: localStorage.getItem('uid'),
            batch_id: this.selected_student.batch_id,
          },
          this.log_service
        );
        this.selected_student_chat_message = [];
        this.selected_student.sme_id = doc.value;

        this.active_student_list = this.active_student_list.filter(
          (stu) =>
            !(
              stu.student_id === this.selected_student.student_id &&
              stu.batch_id === this.selected_student.batch_id
            )
        );

        this.live_session_chat_service.transfer(this.selected_student);
        this.live_session_chat_service.leave({
          room_id:
            this.selected_student.student_id + this.selected_student.batch_id,
        });

        this.selected_student = '';
      }
    });
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

  load_more() {}

  end_all_chat() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to end all chats',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.spinner = true;
        const batch_name = this.batch.filter(
          (batch) => batch._id === this.selected_batch._id
        );

        create_log(
          {
            html_content: `<p>
            <a href=""> ${this.user.name} </a> has ended all chats of batch ${batch_name[0].batch_name} from single window agent mode`,
            created_at: new Date(),
            chat_id: null,
            log_code: '#CHAT',
            user_id: localStorage.getItem('uid'),
            batch_id: this.selected_batch._id,
          },
          this.log_service
        );
        this.selected_student_chat_message = [];

        const data = this.active_student_list.filter(
          (chat) => chat.sme_id === localStorage.getItem('uid')
        );

        if (data.length > 0) {
          data.forEach((chat) => {
            this.live_session_chat_service.leave({
              room_id: chat.student_id + chat.batch_id,
            });
          });
          this.live_session_chat_service.end_all_chat(data);
        }

        this.active_student_list = [];
        this.selected_student = '';

        this.spinner = false;
      }
    });
  }

  ngOnInit(): void {
    this.get_admin_batch();
    this.get_all_admin();
    const user: any = ACTIVE_USER();
    create_log(
      {
        html_content: `<p>
          <a href=""> ${user.name} </a> has opened Single Window agent mode
        </p>`,
        created_at: new Date(),
        chat_id: null,
        log_code: '#CHAT',
        user_id: localStorage.getItem('uid'),
      },
      this.log_service
    );
  }

  ngOnDestroy(): void {
    this.live_session_chat_service.remove_listen();
    if (this.selected_student) {
      this.live_session_chat_service.leave({
        room_id:
          this.selected_student.student_id + this.selected_student.batch_id,
      });
    }
    this.interval ? this.interval.unsubscribe() : '';
    this.manual_check_available_chat
      ? this.manual_check_available_chat.unsubscribe()
      : '';
  }
}
