import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { PasswordModule } from 'primeng/password';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CardModule } from 'primeng/card';
import {CascadeSelectModule} from 'primeng/cascadeselect';

const primeng = [
  AutoCompleteModule,
  CalendarModule,
  CheckboxModule,
  ChipsModule,
  DropdownModule,
  InputTextModule,
  InputTextareaModule,
  KeyFilterModule,
  MultiSelectModule,
  ButtonModule,
  StepsModule,
  PasswordModule,
  TreeModule,
  TreeTableModule,
  ProgressSpinnerModule,
  MessageModule,
  MessagesModule,
  ToastModule,
  TableModule,
  MenuModule,
  DialogModule,
  AccordionModule,
  BadgeModule,
  TooltipModule,
  DividerModule,
  InputSwitchModule,
  CardModule,
  CascadeSelectModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, primeng],
  exports: [primeng],
})
export class PrimengModule {}
