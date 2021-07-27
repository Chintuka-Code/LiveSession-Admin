import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QUILL_TOOLBAR_SETTING } from 'src/app/utilities/quill_setting';
import 'quill-emoji/dist/quill-emoji.js';

@Component({
  selector: 'app-exam-instruction',
  templateUrl: './exam-instruction.component.html',
  styleUrls: ['./exam-instruction.component.scss']
})
export class ExamInstructionComponent implements OnInit {
  create_exam_form: FormGroup;
  modules = {};
  constructor(
    private fb: FormBuilder,
  ) {
    this.modules = QUILL_TOOLBAR_SETTING;
   }

  ngOnInit(): void {
    this.validation()
  }

  validation() {
    this.create_exam_form = this.fb.group({
      instruction: ['', Validators.required],
      
   
    });
  }

  exam_form_submit(){
    console.log('mkkl');
    
  }


}
