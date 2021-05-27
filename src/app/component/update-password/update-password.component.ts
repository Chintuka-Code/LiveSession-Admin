import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  update_password_form: FormGroup;
  spinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private user_service: UserService,
    private router: Router
  ) {}

  validation() {
    this.update_password_form = this.fb.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
    });
  }

  async update_password() {
    this.spinner = true;

    try {
      const data = this.update_password_form.getRawValue();
      await this.user_service.update_password(data);
      Swal.fire({
        icon: 'success',
        title: 'Yeah...',
        text: 'Password Update',
      }).then(() => {
        this.router.navigate(['']);
        this.spinner = false;
        this.update_password_form.reset();
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Ohh...',
        text: error.message,
      }).then(() => {
        this.spinner = false;
      });
      this.spinner = false;
    }
  }

  ngOnInit(): void {
    this.validation();
  }
}
