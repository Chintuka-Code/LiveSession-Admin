import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-question-bank',
  templateUrl: './view-question-bank.component.html',
  styleUrls: ['./view-question-bank.component.scss'],
})
export class ViewQuestionBankComponent implements OnInit {
  spinner: boolean = false;
  user_profile: any;
  items: any = [{ label: 'Actions', items: [] }];
  menu_type: string;

  constructor(private router: Router) {}

  setMenu() {
    this.spinner = true;
    this.user_profile = ACTIVE_USER();

    if (!this.user_profile.permissions.includes('C00')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Access Denied',
      });
      this.router.navigate(['/main']);
      return;
    }

    // this.get_all_course(this.course_type_disabled);

    this.items[0].items.push({
      label: 'View',
      icon: 'pi pi-eye',
      command: () => {
        this.menu_type = 'view';
      },
    });
    this.items[0].items.push({
      label: 'Disabled',
      icon: 'pi pi-trash',
      command: () => {
        this.menu_type = 'disabled';
      },
    });

    this.items[0].items.push({
      label: 'Edit',
      icon: 'pi pi-user-edit',
      command: () => {
        this.menu_type = 'edit';
      },
    });

    // if (this.user_profile.permissions.includes('C01')) {
    //   this.items[0].items.push({
    //     label: 'Edit',
    //     icon: 'pi pi-user-edit',
    //     command: () => {
    //       this.menu_type = 'edit';
    //     },
    //   });
    // }
  }

  ngOnInit(): void {}
}
