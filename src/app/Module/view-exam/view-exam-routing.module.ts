import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewExamComponent } from '../../component/view-exam/view-exam.component';
import { SubmissionComponent } from '../../component/submission/submission.component'
import { StudentExamSubmissionComponent } from '../../component/student-exam-submission/student-exam-submission.component'

const routes: Routes = [
  { 
    path: '', 
    component: ViewExamComponent 
  },
  { 
    path: 'submission/:exam_id', 
    component: SubmissionComponent 
  },
  { 
    path: 'submission/:exam_id/:email', 
    component: StudentExamSubmissionComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewExamRoutingModule { }
