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
    this.batch_service.get_all_enable_batch().subscribe((res) => {
      this.batch = FormativeData.format_firebase_get_request_data(res);
      this.get_user_info();
    });
  }

  get_user_info() {
    this.user_service.get_user_by_id(this.user_id).subscribe((res) => {
      this.user = res.data();
      this.selected_batch = this.user.batch_ids;
      this.spinner = false;
    });
  }

  async add_admin_into_batch() {
    this.spinner = true;
    const response = await this.user_service.add_admin_into_batch(
      this.selected_batch,
      this.user_id
    );
    Swal.fire({
      icon: 'success',
      title: 'Yeah...',
      text: 'Admin Added',
    }).then(() => {
      this.router.navigate(['/main/user-details/admin']);
    });
    this.selected_batch = [];
    this.spinner = false;
  }

  ngOnInit(): void {
    this.user_id = this.activated_route.snapshot.params.user_id;
    this.get_all_batch();
  }
}
