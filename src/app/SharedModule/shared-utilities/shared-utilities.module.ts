import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../component/spinner/spinner.component';
import { PrimengModule } from '../primeng/primeng.module';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule, PrimengModule],
  exports: [SpinnerComponent],
})
export class SharedUtilitiesModule {}
