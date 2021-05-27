import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateUserRoutingModule } from './create-user-routing.module';
import { CreateUserComponent } from 'src/app/component/create-user/create-user.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateUserComponent],
  imports: [
    CommonModule,
    CreateUserRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CreateUserModule {}
