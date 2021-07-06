import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomFieldsService } from 'src/app/service/custom-fields.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-custom-fields',
  templateUrl: './custom-fields.component.html',
  styleUrls: ['./custom-fields.component.scss'],
})
export class CustomFieldsComponent implements OnInit {
  spinner: boolean = false;
  custom_fields_form: FormGroup;
  option: string;
  type: any[] = [
    { name: 'input' },
    { name: 'checkbox' },
    { name: 'radio' },
    { name: 'date' },
    { name: 'selection' },
  ];
  constructor(
    private fb: FormBuilder,
    private custom_fields_service: CustomFieldsService,
    private router: Router
  ) {}

  validation() {
    this.custom_fields_form = this.fb.group({
      name: ['', Validators.required],
      required: [true, Validators.required],
      type: ['', Validators.required],
      option: new FormArray([]),
      placeholder: ['', Validators.required],
    });
  }

  get option_() {
    return this.custom_fields_form.get('option') as FormArray;
  }

  addSkill() {
    const control = new FormControl('', Validators.required);
    this.option_.push(control);
  }

  remove(i) {
    this.option_.removeAt(i);
  }

  get_change(event) {
    this.option_.clear();
    this.option = '';
    if (event.value === 'radio' || event.value === 'selection') {
      this.option = 'select';
      this.addSkill();
    }
  }

  create_custom_fields() {
    this.spinner = true;
    const data = this.custom_fields_form.getRawValue();
    data['feature_in'] = ['ticket'];
    data['disabled'] = false;
    this.custom_fields_service.create_custom_fields(data).subscribe(
      (res) => {
        // console.log(res);
        this.custom_fields_form.reset();
        this.option_.clear();
        this.option = '';
        this.spinner = false;
      },
      (error) => this.error_handler(error)
    );
  }

  error_handler(error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.errorMessage,
    }).then(() => {
      this.spinner = false;
      this.router.navigate(['/main']);
    });
  }

  ngOnInit(): void {
    this.validation();
  }
}
