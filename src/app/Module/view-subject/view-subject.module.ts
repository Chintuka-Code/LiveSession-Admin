import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewSubjectRoutingModule } from './view-subject-routing.module';
import { ViewSubjectComponent } from '../../component/view-subject/view-subject.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewSubjectComponent],
  imports: [
    CommonModule,
    ViewSubjectRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ViewSubjectModule {}
