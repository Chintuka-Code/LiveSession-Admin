import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmPassword } from 'src/app/CustomValidation/ConfirmPassword';
import { UserService } from 'src/app/service/user.service';
import { eye_button } from 'src/app/utilities/password_eye';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  update_password_form: FormGroup;
  spinner: boolean = false;

  @ViewChild('password') password: ElementRef;

  constructor(
    private fb: FormBuilder,
    private user_service: UserService,
    private router: Router
  ) {}

  validation() {
    this.update_password_form = this.fb.group(
      {
        old_password: ['', [Validators.required]],
        new_password: ['', [Validators.required]],
        confirm_password: ['', Validators.required],
      },
      {
        validators: confirmPassword.bind(this.update_password_form),
      }
    );
  }

  show_password() {
    eye_button(this.password);
  }

  update_password() {
    this.spinner = true;
    const data = this.update_password_form.getRawValue();
    this.user_service.update_password(data).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Password Update',
        }).then(() => {
          this.spinner = false;
          this.update_password_form.reset();
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage,
        }).then(() => {
          this.spinner = false;
        });
      }
    );
  }

  ngOnInit(): void {
    this.validation();
  }
}
