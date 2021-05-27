import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { MainComponent } from '../../component/main/main.component';
import { AsideComponent } from '../../component/aside/aside.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    AsideComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class MainModule {}
