import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-browser-setting',
  templateUrl: './browser-setting.component.html',
  styleUrls: ['./browser-setting.component.scss']
})
export class BrowserSettingComponent implements OnInit {

  create_exam_form: FormGroup;
  // selectedValues: string[] = ['val1','val2'];
  selectedCities: string[] = [];

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.validation()
  }

  validation() {
    this.create_exam_form = this.fb.group({
      right_click: [false, Validators.required],
      copy_paste: [false, Validators.required],
      auto_complete: [false, Validators.required],
      spell_check: [false, Validators.required],
      printing: [false, Validators.required],
      tab_switching: [false, Validators.required],
      window_minimize: [false, Validators.required],
      live_screen_monitoring: [false, Validators.required],
     
   
    });
  }

  exam_form_submit(){
    console.log(this.create_exam_form.value);
    
  }

}
