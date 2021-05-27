import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
  ) {}

  validation() {
    this.login_form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async login() {
    this.spinner = !this.spinner;
    const data = this.login_form.getRawValue();
    try {
      const response = await this.user_service.login(data);
      const token = (await response.user.getIdTokenResult(true)).token;
      localStorage.setItem('uid', response.user.uid);
      localStorage.setItem('email', response.user.email);
      localStorage.setItem('token', token);
      Swal.fire({
        icon: 'success',
        title: 'Yeah...',
        text: 'Login',
      }).then(() => {
        this.spinner = !this.spinner;
        this.router.navigate(['/main']);
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      }).then(() => {
        this.spinner = !this.spinner;
      });
    }
  }

  ngOnInit(): void {
    this.validation();
  }
}
