import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BatchService } from 'src/app/service/batch.service';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';
import { AttachmentService } from 'src/app/service/attachment.service';
import { Router } from '@angular/router';
import { LiveSessionChatService } from 'src/app/service/live-session-chat.service';

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
      if (this.selected_student_chat_message) {
        this.selected_student_chat_message.push(res);
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
      console.log(this.active_student_list);
      this.spinner = false;
    });
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
    this.active_student_list.sort(
      (a, b) => b.admin_unread_count - a.admin_unread_count
    );
  }

  textarea_auto_increment(event) {
    const tx = event.target;
    tx.style.height = 'auto';
    tx.style.height = tx.scrollHeight + 'px';
  }

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
    this.selected_student = student;

    console.log(this.selected_student);

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
          const response = res.data;
          this.selected_student_chat_message = response.message;
          this.scroll_chat_container();
          this.spinner = false;
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
  async send_message(message) {
    this.message_sending = true;
    const message_obj = {
      text_message: message.value,
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
    };
    this.textarea.nativeElement.value = '';
    try {
      if (this.files.length > 0) {
        const files: any = await this.attachment_service.upload_files(
          this.files
        );
        message_obj['attachment'] = FormativeData.concat_url_with_files(
          files.files_paths
        );
      }

      this.live_session_chat_service.send_message(message_obj, data);

      this.files = [];
      this.message_sending = false;
    } catch (error) {
      console.log(error);
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
        this.live_session_chat_service.end_all_chat([this.selected_student]);
        this.selected_student = '';
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
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'Do you want to end all chat',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes',
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     this.spinner = true;
    //     this.selected_student_chat_message = undefined;
    //     await Promise.all(
    //       this.active_student_list.map(async (student) => {
    //         if (
    //           student.sme_id === localStorage.getItem('uid') &&
    //           student.batch_id === this.selected_batch.batch_id
    //         ) {
    //           await this.chat_service.end_all_chat(student);
    //         }
    //       })
    //     );
    //     this.selected_student = '';
    //     this.spinner = false;
    //   }
    // });
  }

  ngOnInit(): void {
    this.get_admin_batch();
    this.get_all_admin();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.live_session_chat_service.disconnect();
  }
}
