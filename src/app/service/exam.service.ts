import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private http: HttpClient) {}

  examDetails = {
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

  // private paymentComplete = new Subject<any>();

  // paymentComplete$ = this.paymentComplete.asObservable();

  // getTicketInformation() {
  //     return this.examDetails;
  // }

  // setTicketInformation(ticketInformation) {
  //     this.examDetails = ticketInformation;
  // }

  // complete() {
  //     this.paymentComplete.next(this.examDetails.exam_form);
  // }

  get_all_batch() {
    return this.http.get(`${environment.BASE_SERVER_URL}/batch/get-batch-exam`);
  }

  get_students_by_batch(ids: []) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/batch/get-student-batch-exam`,
      { ids }
    );
  }

  get_all_question_bank() {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/question-bank/get-all-question-bank-exam`
    );
  }

  get_question_by_qb(ids: []) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/question-bank/get-question-by-bankId`,
      { ids }
    );
  }

  create_exam(data: {}) {
    return this.http.post(`${environment.BASE_SERVER_URL}/exam/create`, {
      data,
    });
  }

  get_all_exam() {
    return this.http.get(`${environment.BASE_SERVER_URL}/exam/get-all`);
  }

  update_exam(id, data) {
    delete data._id;
    return this.http.put(`${environment.BASE_SERVER_URL}/exam/update/${id}`, {
      data,
    });
  }
}
