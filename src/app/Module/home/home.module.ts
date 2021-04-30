import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { HomeComponent } from '../../component/home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, PrimengModule],
})
export class HomeModule {}
