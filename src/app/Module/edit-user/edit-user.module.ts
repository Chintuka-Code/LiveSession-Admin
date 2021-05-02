import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUserRoutingModule } from './edit-user-routing.module';
import { EditUserComponent } from '../../component/edit-user/edit-user.component';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditUserComponent],
  imports: [
    CommonModule,
    EditUserRoutingModule,
    SharedUtilitiesModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class EditUserModule {}
