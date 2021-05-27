import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../component/spinner/spinner.component';
import { PrimengModule } from '../primeng/primeng.module';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    PrimengModule,
    NgxCsvParserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MomentModule
  ],
  exports: [
    SpinnerComponent,
    NgxCsvParserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MomentModule
  ],
})
export class SharedUtilitiesModule {}
