import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionBankService {
  constructor(private http: HttpClient) {}

  create_question_bank(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/question-bank/create-question-bank`,
      { data }
    );
  }

  get_all_question_bank(type) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/question-bank/get-all-question-bank/${type}`
    );
  }

  get_question_details_Id(id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/question-bank/question-bank-details/${id}`
    );
  }

  update_question_details_Id(data, id) {
    return this.http.patch(
      `${environment.BASE_SERVER_URL}/question-bank/update-question-bank-details/${id}`,
      { data }
    );
  }
}
