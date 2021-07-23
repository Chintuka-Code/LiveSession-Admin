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
}
