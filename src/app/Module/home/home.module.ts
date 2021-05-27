import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { HomeComponent } from '../../component/home/home.component';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class HomeModule {}
