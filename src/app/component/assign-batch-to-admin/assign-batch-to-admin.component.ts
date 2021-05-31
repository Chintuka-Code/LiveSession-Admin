import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchService } from 'src/app/service/batch.service';
import { UserService } from 'src/app/service/user.service';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-batch-to-admin',
  templateUrl: './assign-batch-to-admin.component.html',
  styleUrls: ['./assign-batch-to-admin.component.scss'],
})
export class AssignBatchToAdminComponent implements OnInit {
  spinner: boolean = false;
  batch: any[];
  selected_batch: any[] = [];
  user_id: string;
  user: any;
  constructor(
    private batch_service: BatchService,
    private activated_route: ActivatedRoute,
    private user_service: UserService,
    private router: Router
  ) {}

  get_all_batch() {
    this.spinner = true;
    this.batch_service.get_all_batch(false).subscribe(
      (res: any) => {
        this.batch = res.data;
        console.log(this.batch);
        this.get_user_info();
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

  get_user_info() {
    this.user_service.get_user_by_id(this.user_id).subscribe(
      (res: any) => {
        this.user = res.data;
        console.log(this.user);
        this.selected_batch = this.user.batch_ids;
        console.log(this.selected_batch);
        this.spinner = false;
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

  async add_admin_into_batch() {
    this.spinner = true;
    const data = { user_id: this.user_id, batch: this.selected_batch };
    console.log(data);
    this.user_service.add_admin_into_batch(data).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Admin Added',
        }).then(() => {
          this.router.navigate(['/main/user-details/admin']);
          this.spinner = false;
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
    this.user_id = this.activated_route.snapshot.params.user_id;
    this.get_all_batch();
  }
}
