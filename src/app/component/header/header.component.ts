import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LiveSessionChatService } from 'src/app/service/live-session-chat.service';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import { NotificationService } from 'src/app/service/notification.service';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GlobalState } from 'src/app/store/states/global.state';
import { updateAside } from 'src/app/store/actions/global.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: any;
  notification: any[] = [];
  count: number = 0;
  spinner: boolean = false;
  @ViewChild('sound') sound: ElementRef;

  @Select(GlobalState.getAside) aside$: Observable<boolean>;

  constructor(
    private live_session_service: LiveSessionChatService,
    private router: Router,
    private notification_service: NotificationService,
    private store: Store
  ) {
    this.live_session_service.new_ticket().subscribe((res) => {
      if (res.sender_type !== 'admin') {
        res.createdAt = Date.now();
        this.sound.nativeElement.pause();
        this.sound.nativeElement.currentTime = 0;
        this.sound.nativeElement.play();
        this.notification.unshift(res);
        this.count++;
      }
    });

    this.live_session_service.update_notification_list().subscribe(() => {
      this.get_notification(0);
      // console.log('get');
    });
  }

  show_aside() {
    this.store.dispatch(new updateAside());
  }

  get_notification(skip) {
    this.spinner = true;
    this.notification_service
      .get_my_notification(localStorage.getItem('uid'), skip)
      .subscribe(
        (res: any) => {
          this.count = res.count;
          this.notification = res.data;
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

  logout() {
    Swal.fire({
      icon: 'success',
      title: 'Logout',
    }).then(() => {
      this.router.navigate(['']);
      this.live_session_service.user_status({
        user_id: localStorage.getItem('uid'),
        status: 'Offline',
      });
      localStorage.clear();
    });
  }

  onScroll() {
    this.notification_service
      .get_my_notification(
        localStorage.getItem('uid'),
        this.notification.length
      )
      .subscribe(
        (res: any) => {
          this.count = res.count;
          res.data.forEach((element) => this.notification.push(element));
        },
        (error) => this.error_handler(error)
      );
  }

  aside() {
    this.aside$.subscribe((res) => {
      const arrow = document.querySelector('.arrow');
      if (res) {
        document.querySelector('body').classList.toggle('sidebar-hidden');
        arrow.classList.toggle('arrow-swing');
      } else {
        document.querySelector('body').classList.toggle('sidebar-hidden');
        arrow.classList.toggle('arrow-swing');
      }
    });
  }

  ngOnInit(): void {
    this.user = ACTIVE_USER();
    this.get_notification(0);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.aside();
    this.show_aside();
  }
}
