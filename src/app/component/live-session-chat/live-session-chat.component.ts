import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BatchService } from 'src/app/service/batch.service';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';
import { AttachmentService } from 'src/app/service/attachment.service';
import { Router } from '@angular/router';

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
  selected_student_chat_message: any;
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
    private attachment_service: AttachmentService
  ) {}

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

  // after batch select get all the student list
  get_all_student_chat() {
    this.spinner = true;
    this.selected_student = '';
    this.selected_student_chat_message = '';
    this.chat_service
      .get_active_chat(localStorage.getItem('uid'), this.selected_batch._id)
      .subscribe(
        (res) => {
          const data = FormativeData.formative_snapshot_data(res);
          // after update sme id , update selected student
          if (this.selected_student) {
            const sel = data.filter(
              (student_list) =>
                this.selected_student.student_id == student_list.student_id &&
                this.selected_student.batch_id == student_list.batch_id &&
                this.selected_student.doc_id == student_list.doc_id
            );
            this.selected_student = sel[0];
          }
          // snapshot trigger in this block that why again check the selected student sme id
          this.has_sme = this.selected_student.sme_id ? true : false;

          // filter data
          this.active_student_list = data.filter(
            (student) =>
              !student.sme_id || student.sme_id === localStorage.getItem('uid')
          );

          // enable/disable end all chat button
          this.end_all_chat_button = this.active_student_list.some(
            (student) => student.sme_id === localStorage.getItem('uid')
          );
          this.scroll_chat_container();
          this.spinner = false;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'ooh...',
            text: 'Something Went Wrong',
          });
        }
      );
  }

  // after student selected get their chat
  get_selected_student_chat(student) {
    this.spinner = true;
    this.selected_student = student;
    this.has_sme = this.selected_student.sme_id ? true : false;
    this.chat_service
      .get_chat_message(this.selected_student.doc_id)
      .subscribe((res) => {
        this.selected_student_chat_message = res.reverse();
        this.scroll_chat_container();
        this.spinner = false;
      });
  }

  async assign_chat_to_admin() {
    this.spinner = true;
    await this.chat_service.assign_chat_admin(
      this.selected_student.doc_id,
      localStorage.getItem('uid')
    );

    this.spinner = false;
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
      message: message.value,
      sme_id: null,
      sender_name: this.user.name,
      sender_type: 'admin',
      attachment: [],
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
      await this.chat_service.create_chat_message(
        message_obj,
        this.selected_student.doc_id
      );
      await this.chat_service.update_chat_counter(
        this.selected_student.doc_id,
        this.selected_student.student_unread_count + 1
      );
      this.files = [];
      this.message_sending = false;
      setTimeout(() => {
        this.scroll_chat_container();
      }, 100);
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
        this.selected_student_chat_message = undefined;
        await this.chat_service.end_chat(this.selected_student.doc_id);
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
        this.selected_student_chat_message = undefined;
        await this.chat_service.assign_chat_admin(
          this.selected_student.doc_id,
          doc.value
        );
        this.selected_student = '';
        this.spinner = false;
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

  load_more() {
    this.chat_service
      .get_chat_all_message(this.selected_student.doc_id)
      .subscribe((res) => {
        this.selected_student_chat_message = res.reverse();
        this.spinner = false;
      });
  }

  end_all_chat() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to end all chat',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.spinner = true;
        this.selected_student_chat_message = undefined;

        await Promise.all(
          this.active_student_list.map(async (student) => {
            if (
              student.sme_id === localStorage.getItem('uid') &&
              student.batch_id === this.selected_batch.batch_id
            ) {
              await this.chat_service.end_all_chat(student);
            }
          })
        );

        this.selected_student = '';
        this.spinner = false;
      }
    });
  }

  ngOnInit(): void {
    this.get_admin_batch();
    this.get_all_admin();
  }
}
