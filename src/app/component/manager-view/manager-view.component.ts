import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BatchService } from 'src/app/service/batch.service';
import { ChatService } from 'src/app/service/chat.service';
import { LiveSessionChatService } from 'src/app/service/live-session-chat.service';
import { Calculate_time } from 'src/app/utilities/calculate_color';
import Swal from 'sweetalert2';
import { interval } from 'rxjs/internal/observable/interval';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.scss'],
})
export class ManagerViewComponent implements OnInit {
  spinner: boolean = false;
  batches: any[] = [];
  selected_batch: string;
  active_student_list: any[] = [];
  selected_student: any;
  student_message: any[] = [];
  @ViewChild('sound') sound: ElementRef;
  interval: Subscription;
  admins_list: any[] = [];

  constructor(
    private batch_service: BatchService,
    private router: Router,
    private chat_service: ChatService,
    private live_session_chat_service: LiveSessionChatService,
    private user_service: UserService
  ) {
    // new message
    this.live_session_chat_service.new_message_received().subscribe((res) => {
      this.sound.nativeElement.pause();
      this.sound.nativeElement.currentTime = 0;
      if (res.message.sender_type !== 'admin') {
        this.sound.nativeElement.play();
      }

      if (this.student_message) {
        const index = this.student_message.findIndex(
          (ch) => ch.date == res.message.created_at.split('T')[0]
        );

        if (index > -1) {
          this.student_message[index].message.push(res.message);
        } else {
          this.student_message.push({
            date: res.message.created_at.split('T')[0],
            message: [res.message],
          });
        }

        console.log(res.message);
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
            stu.last_message = null;
          }
          return stu;
        });

        // console.log(this.active_student_list);
        this.sorting(this.active_student_list);
      });

    // transfer chat
    this.live_session_chat_service.transfer_chat().subscribe((res) => {
      const index = this.active_student_list.findIndex(
        (chat) => chat._id === res._id
      );
      if (index) {
        this.active_student_list[index].sme_id = res.sme_id;
      }
      this.spinner = false;
    });
  }

  get_all_batch() {
    this.spinner = true;
    this.batch_service.get_all_batch_chat().subscribe(
      (res: any) => {
        this.batches = res.data;
        this.get_all_admin();
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

  get_all_student_chat() {
    this.spinner = true;
    this.selected_student = '';
    this.student_message = [];
    this.chat_service
      .get_batch_chat_manager_view(this.selected_batch)
      .subscribe(
        (res: any) => {
          this.active_student_list = res.data;
          this.sorting(this.active_student_list);
          console.log(this.active_student_list);
          this.spinner = false;
        },
        (error) => this.error_handler(error)
      );
  }

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
          const response = res.data;
          this.student_message = response.message;
          this.scroll_chat_container();
          this.group_by_date(this.student_message);
        },
        (error) => this.error_handler(error)
      );
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

    // Edit: group data by date
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        message: groups[date],
      };
    });
    this.student_message = groupArrays;
    this.spinner = false;
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

  sorting(data) {
    this.active_student_list.sort(
      (a, b) => b.admin_unread_count - a.admin_unread_count
    );
    this.active_student_list = Calculate_time(this.active_student_list);
    const timer = interval(2000);
    this.interval = timer.subscribe(() => {
      this.active_student_list = Calculate_time(this.active_student_list);
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
        this.student_message = [];
        this.selected_student.sme_id = doc.value;
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
        this.admins_list = res.data;

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
        this.student_message = [];
        this.live_session_chat_service.leave({
          room_id:
            this.selected_student.student_id + this.selected_student.batch_id,
        });
        this.live_session_chat_service.end_all_chat([this.selected_student]);
        const index = this.active_student_list.findIndex(
          (chat) => chat._id === this.selected_student._id
        );
        this.active_student_list[index].sme_id = null;
        this.selected_student = '';
        this.spinner = false;
      }
    });
  }

  ngOnInit(): void {
    this.get_all_batch();
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
  }
}
