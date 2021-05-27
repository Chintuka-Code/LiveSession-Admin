import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { LoginComponent } from 'src/app/component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    PrimengModule,
    ReactiveFormsModule,
    FormsModule,
    SharedUtilitiesModule,
  ],
})
export class LoginModule {}
