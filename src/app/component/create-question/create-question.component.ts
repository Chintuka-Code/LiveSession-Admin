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
  new_created: boolean = true;
  create_question_form: FormGroup;
  address;
  group: any = new FormGroup({
    name: new FormControl(''),
    address: new FormArray([new FormControl('')]),
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  validation() {
    this.create_question_form = this.fb.group({
      question: this.fb.array([this.group]),
    });
  }

  get question() {
    return this.create_question_form.get('question') as FormArray;
  }

  add_question() {
    this.question.push(this.group);
  }

  addY(ix) {
    const control = (<FormArray>this.create_question_form.controls['question'])
      .at(ix)
      .get('address') as FormArray;

    console.log(control);

    control.push(new FormControl(''));
  }

  create_question() {
    const data = this.create_question_form.getRawValue();
    console.log(data);
  }

  add() {
    for (let i = 0; i < 3; i++) {
      this.add_question();
    }
  }

  ngOnInit(): void {
    this.validation();
    this.add();
  }
}
