import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateSubjectRoutingModule } from './create-subject-routing.module';
import { CreateSubjectComponent } from '../../component/create-subject/create-subject.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateSubjectComponent],
  imports: [
    CommonModule,
    CreateSubjectRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CreateSubjectModule {}
