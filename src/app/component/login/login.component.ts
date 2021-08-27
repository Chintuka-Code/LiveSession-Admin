import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LiveSessionChatService } from 'src/app/service/live-session-chat.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login_form: FormGroup;
  spinner: boolean = false;
  constructor(
    private fb: FormBuilder,
    private user_service: UserService,
    private router: Router,
    private live_session_service: LiveSessionChatService
  ) {}

  validation() {
    this.login_form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.spinner = !this.spinner;
    const data = this.login_form.getRawValue();

    this.user_service.login(data).subscribe(
      (res: any) => {
        localStorage.setItem('uid', res.uid);
        localStorage.setItem('token', res.token);
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Login',
        }).then(() => {
          this.spinner = !this.spinner;
          this.live_session_service.user_status({
            user_id: res.uid,
            status: 'Online',
          });
          this.router.navigate(['/main']);
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage,
        }).then(() => {
          this.spinner = !this.spinner;
        });
      }
    );
  }

  ngOnInit(): void {
    this.validation();
  }
}
