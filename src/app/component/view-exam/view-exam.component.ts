import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ExamService } from '../../service/exam.service';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-exam',
  templateUrl: './view-exam.component.html',
  styleUrls: ['./view-exam.component.scss'],
})
export class ViewExamComponent implements OnInit {
  spinner: boolean = false;
  exam_list;
  user_profile: any;
  menu_type: string;
  items: any = [{ label: 'Actions', items: [] }];
  question_bank_type_disabled: boolean = false;
  publish_url: string = null;

  constructor(private router: Router, private examService: ExamService) {}

  ngOnInit(): void {
    this.get_all_exam();
    this.setMenu();
  }

  get_all_exam() {
    this.examService.get_all_exam().subscribe(
      (res: any) => {
        // console.log(res);

        this.exam_list = res.data;
        console.log(this.exam_list);
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

  exam_action(exam) {
    // console.log(exam);

    switch (this.menu_type) {
      case 'view':
        this.view_exam_details();
        break;
      case 'edit':
        this.examService.examDetails = exam;
        this.examService.examDetails['selected_question'] = [];
        let question_bank = exam.questions.map((data) => {
          return data.question_bank_id;
        });

        let question = exam.questions.map((data) => {
          return data.questions;
        });

        var merged = [].concat.apply([], question);

        this.examService.examDetails['selected_question']['question_bank'] =
          question_bank;
        this.examService.examDetails['selected_question']['question'] = merged;
        let publish = this.examService.examDetails['publish'];
        if (publish['start_date']) {
          publish['start_date'] = new Date(publish['start_date']);
        }
        if (publish['end_date']) {
          publish['end_date'] = new Date(publish['end_date']);
        }
        if (publish['start_time']) {
          publish['start_time'] = new Date(publish['start_time']);
        }
        if (publish['end_time']) {
          publish['end_time'] = new Date(publish['end_time']);
        }
        if (publish['slot_end_time']) {
          publish['slot_end_time'] = new Date(publish['slot_end_time']);
        }
        if (publish['slot_start_time']) {
          publish['slot_start_time'] = new Date(publish['slot_start_time']);
        }
        this.examService.examDetails['publish'] = publish;
        console.log(this.examService.examDetails);
        this.router.navigate(['/main/create-exam/form']);
        break;
      case 'disabled':
        this.disabled_exam(exam._id);
        break;
      case 'publish':
        this.publish_exam(exam);
        break;
      case 'submission':
        this.router.navigate(['/main/view-exam/submission']);
        break;
      default:
        console.log('');
    }
  }

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
      label: 'Publish',
      icon: 'pi pi-globe',
      command: () => {
        this.menu_type = 'publish';
      },
    });

    this.items[0].items.push({
      label: 'View Submission',
      icon: 'pi pi-eye',
      command: () => {
        this.menu_type = 'submission';
      },
    });
  }

  view_exam_details() {
    console.log('view exam');
  }
  disabled_exam(id) {
    this.updateExam(id, { disabled: true }, 'Exam desabled successfully');
  }

  publish_exam(exam) {
    exam.publish['is_publish'] = true;

    this.publish_url = `${environment.STUDENT_BASE_SERVER_URL}/exam/${exam._id}`;
    exam.publish['publish_url'] = this.publish_url;

    this.updateExam(
      exam._id,
      { publish: exam.publish },
      'Exam published successfully'
    );
  }

  copyExamUrl(event) {
    console.log(event.target.innerText);
  }

  copy_password(index) {
    var copyText = document.getElementById(`pwd_spn${index}`);
    var textArea = document.createElement('textarea');
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('Copy');
    textArea.remove();
  }

  updateExam(id, data, message) {
    this.examService.update_exam(id, data).subscribe(
      (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: message,
        }).then(() => this.router.navigate(['main/view-exam']));
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

  createExam() {
    this.examService.examDetails = {
      exam_form: {},
      instruction: '',
      access_setting: {},
      security_settings: {},
      questions: [],
      publish: {},
      selected_question: [],
      add_section:'',
      section:[]
    };
    this.router.navigate(['/main/create-exam']);
  }
}
