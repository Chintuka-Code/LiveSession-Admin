import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { MainComponent } from '../../component/main/main.component';
import { AsideComponent } from '../../component/aside/aside.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    AsideComponent,
  ],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
