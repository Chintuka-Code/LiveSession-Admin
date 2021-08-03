import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamService } from '../../../service/exam.service'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-browser-setting',
  templateUrl: './browser-setting.component.html',
  styleUrls: ['./browser-setting.component.scss']
})
export class BrowserSettingComponent implements OnInit {

  create_exam_form: FormGroup;

  selectedCities: string[] = [];
  security_settings = {}

  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.validation()
    this.security_settings = this.examService.examDetails.security_settings;
  }

  validation() {
    this.create_exam_form = this.fb.group({
      right_click: [false, Validators.required],
      copy_paste: [false, Validators.required],
      auto_complete: [false, Validators.required],
      spell_check: [false, Validators.required],
      printing: [false, Validators.required],
      tab_switching: [false, Validators.required],
      window_minimize: [false, Validators.required],
      live_screen_monitoring: [false, Validators.required],
     
   
    });
  }

  exam_form_submit(){
    console.log(this.create_exam_form.value);
    
  }


  nextPage() {
    this.examService.examDetails.security_settings = this.security_settings;
    this.router.navigate(['main/create-exam/exam_question']);
    
}

prevPage() {
    this.router.navigate(['main/create-exam/attempts']);
}

}
