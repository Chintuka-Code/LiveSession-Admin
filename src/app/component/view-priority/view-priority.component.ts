import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PriorityService } from 'src/app/service/priority.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-priority',
  templateUrl: './view-priority.component.html',
  styleUrls: ['./view-priority.component.scss'],
})
export class ViewPriorityComponent implements OnInit {
  spinner: boolean = false;
  priority_list: any[] = [];
  items: any = [{ label: 'Actions', items: [] }];
  menu_type: string;
  active: boolean = true;

  constructor(
    private priority_service: PriorityService,
    private router: Router
  ) {}

  setMenu() {
    this.get_all_priority(false);

    this.items[0].items.push({
      label: 'Edit',
      icon: 'pi pi-user-edit',
      command: () => {
        this.menu_type = 'edit';
      },
    });
  }

  get_all_priority(type) {
    this.priority_service.get_priority(type).subscribe(
      (res: any) => {
        this.priority_list = res.data;
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

  change_data() {
    this.active = !this.active;
    this.get_all_priority(!this.active);
  }

  update_priority(priority) {
    this.update_fields_helper(priority, true);
  }

  enable_priority(priority) {
    this.update_fields_helper(priority, false);
  }

  update_fields_helper(fields, type) {
    const string = type ? 'Disabled' : 'Enabled';

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${string} ${fields.name} fields`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${string} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        fields['disabled'] = type;
        this.spinner = false;

        this.priority_service.update_status(fields).subscribe(
          (res) => {
            this.get_all_priority(!type);
            this.spinner = false;
          },
          (error) => this.error_handler(error)
        );
      } else {
        this.spinner = false;
      }
    });
  }

  ngOnInit(): void {
    this.setMenu();
  }
}
