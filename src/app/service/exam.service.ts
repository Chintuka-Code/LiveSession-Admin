import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ExamService {

  constructor() { }

  examDetails = {
    examForm: {
        exam_name: '',
        is_timed: 'Yes',
        exam_duration: ''
    },
    instruction: '',
    access_setting: {access_control:{cname:'',code:''}},
    browser_settings: {
      right_click:'',
      auto_complete:'',
      spell_check:'',
      printing:'',
      tab_switching:'',
      window_minimize:'',
      live_screen_monitoring:'',
    },
    questions:{
      
    },
    publish:{}
  };

  private paymentComplete = new Subject<any>();

  paymentComplete$ = this.paymentComplete.asObservable();

  getTicketInformation() {
      return this.examDetails;
  }

  setTicketInformation(ticketInformation) {
      this.examDetails = ticketInformation;
  }

  complete() {
      this.paymentComplete.next(this.examDetails.examForm);
  }

}
