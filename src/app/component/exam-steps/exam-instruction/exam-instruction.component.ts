import { Component, OnInit } from '@angular/core';
import { QUILL_TOOLBAR_SETTING } from 'src/app/utilities/quill_setting';
import 'quill-emoji/dist/quill-emoji.js';
import { ExamService } from '../../../service/exam.service'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-instruction',
  templateUrl: './exam-instruction.component.html',
  styleUrls: ['./exam-instruction.component.scss']
})
export class ExamInstructionComponent implements OnInit {

  modules = {};
  content = ''


  instruction: any;
  constructor(
    private examService: ExamService,
    private router: Router
    
  ) {
    this.modules = QUILL_TOOLBAR_SETTING;
   }

  ngOnInit(): void {
   
    this.instruction = this.examService.examDetails.instruction;

  }


  nextPage() {
      this.examService.examDetails.instruction = this.instruction;
      this.router.navigate(['main/create-exam/attempts']);

  }

  prevPage() {
      this.router.navigate(['main/create-exam/form']);
  }
}
