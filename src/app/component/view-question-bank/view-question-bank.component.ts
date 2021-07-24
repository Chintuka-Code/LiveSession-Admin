import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionBankService } from 'src/app/service/question-bank.service';
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
  question_bank_type_disabled: boolean = false;
  question_bank_list;

  constructor(
    private router: Router,
    private question_bank_service: QuestionBankService
  ) {}

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

    this.get_all_question_bank(this.question_bank_type_disabled);

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

    this.items[0].items.push({
      label: 'Add Question',
      icon: 'pi pi-user-plus',
      command: () => {
        this.menu_type = 'add-question';
      },
    });
  }

  question_bank_action(question_bank) {
    switch (this.menu_type) {
      case 'view':
        this.view_question_bank_details(question_bank);
        break;
      case 'edit':
        this.router.navigate(['/main/edit-course', question_bank._id]);
        break;
      case 'disabled':
        this.disabled_question_bank(question_bank);
        break;
      case 'add-question':
        this.router.navigate(['/main/create-question'], {
          queryParams: {
            question_bank_id: question_bank._id,
            question_bank_name: question_bank.question_bank_name,
          },
        });
        break;
      default:
        console.log('');
    }
  }

  get_all_question_bank(type) {
    this.question_bank_service.get_all_question_bank(type).subscribe(
      (res: any) => {
        this.question_bank_list = res.data;
        console.log(this.question_bank_list);
        this.spinner = false;
      },
      (error) => this.error_handler(error)
    );
  }

  get_updated_question_bank() {
    this.question_bank_type_disabled = !this.question_bank_type_disabled;
    this.get_all_question_bank(this.question_bank_type_disabled);
  }

  view_question_bank_details(question_bank) {}

  disabled_question_bank(question_bank) {}

  enable_question_bank(question_bank) {}

  update_course_helper(question_bank, type) {
    const string = type ? 'Disabled' : 'Enabled';

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${string} ${question_bank.question_bank_name} course`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${string} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        question_bank['disabled'] = type;
        // console.log(course);
        // this.course_service.change_status(course).subscribe(
        //   (res) => {
        //     Swal.fire('Disabled!', `Course has been ${string}`, 'success').then(
        //       () => {
        //         this.get_all_course(this.course_type_disabled);
        //       }
        //     );
        //   },
        //   (error) => {
        //     Swal.fire({
        //       icon: 'error',
        //       title: 'Oops...',
        //       text: error.errorMessage,
        //     }).then(() => {
        //       this.spinner = false;
        //     });
        //   }
        // );
      } else {
        this.spinner = false;
      }
    });
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

  ngOnInit(): void {
    this.setMenu();
  }
}
