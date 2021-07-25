import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss'],
})
export class CreateQuestionComponent implements OnInit {
  spinner: boolean = false;
  myForm: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  validation() {
    this.myForm = this.fb.group({
      // you can also set initial formgroup inside if you like
      companies: this.fb.array([
        this.fb.group({
          company: [''],
          projects: this.fb.array([]),
        }),
      ]),
    });
  }

  // getter for easier access
  get companiesFormArr(): FormArray {
    return this.myForm.get('companies') as FormArray;
  }

  addNewCompany() {
    this.companiesFormArr.push(
      this.fb.group({
        company: [''],
        projects: this.fb.array([]),
      })
    );
  }

  deleteCompany(index: number) {
    this.companiesFormArr.removeAt(index);
  }

  addNewProject(control) {
    control.push(
      // this.fb.group({
      //   projectName: [''],
      // })
      this.fb.control([''])
    );
  }

  deleteProject(control, index) {
    control.removeAt(index);
  }

  create_company_fun() {
    const data = this.myForm.getRawValue();
    console.log(data);
  }

  ngOnInit(): void {
    this.validation();
    // this.add();
  }
}
