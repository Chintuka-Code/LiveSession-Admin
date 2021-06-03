import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../component/spinner/spinner.component';
import { PrimengModule } from '../primeng/primeng.module';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';
import { QuillModule } from 'ngx-quill';
import { SanitizeHtmlPipe } from '../../pipe/sanitize-html.pipe';

@NgModule({
  declarations: [SpinnerComponent, SanitizeHtmlPipe],
  imports: [
    CommonModule,
    PrimengModule,
    NgxCsvParserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
    QuillModule,
  ],
  exports: [
    SpinnerComponent,
    NgxCsvParserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
    QuillModule,
    SanitizeHtmlPipe,
  ],
})
export class SharedUtilitiesModule {}
