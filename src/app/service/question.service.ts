import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  create_question_add_into_question_bank(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/question/create-question-add-into-bank`,
      { data }
    );
  }
}
