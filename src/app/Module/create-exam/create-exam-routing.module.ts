import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateExamComponent } from '../../component/create-exam/create-exam.component';

import { ExamInstructionComponent } from '../../component/exam-steps/exam-instruction/exam-instruction.component';
import { BrowserSettingComponent } from '../../component/exam-steps/browser-setting/browser-setting.component';
import { ExamFormComponent } from '../../component/exam-steps/exam-form/exam-form.component';
import { AttemptsComponent } from '../../component/exam-steps/attempts/attempts.component';

const routes: Routes = [
  { path: '', component: CreateExamComponent, children:[
    {path:'', redirectTo: 'form', pathMatch: 'full'},
    {path: 'form', component: ExamFormComponent},
    {path: 'instruction', component: ExamInstructionComponent},
    {path: 'settings', component: BrowserSettingComponent},
    {path: 'attempts', component: AttemptsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateExamRoutingModule { }
