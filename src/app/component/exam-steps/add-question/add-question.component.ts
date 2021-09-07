import { Component, OnInit} from '@angular/core';
import { ExamService } from '../../../service/exam.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
  spinner: boolean = false;
  show_question_count_max = 1;
  section_show_question_count_max = 1;
  show_question_count_min = 1;
  selected_question = [];
  question_banks = [];
  QB_questions = [];
  QB_section_questions = [];
  exam_form;
  section:any = [];
  instruction:any
  submitted: boolean = false;
  create_assign_project_form: FormGroup;
  add_section:string = '';

  constructor(private examService: ExamService, private router: Router,  private fb: FormBuilder,) {}

  
  ngOnInit(): void {
    this.validation();

    this.selected_question = this.examService.examDetails.selected_question;
    // if(this.examService.examDetails.add_section){

      this.add_section = this.examService.examDetails.add_section;
      console.log(this.add_section);
      
    // }
    this.section = this.examService.examDetails.section;
    console.log(this.section);
    
    this.exam_form = this.examService.examDetails.exam_form;
    this.get_question_banks()
    if(this.selected_question['question_bank']){
      this.show_question_count_max = this.selected_question['question']?.length;
      this.get_question_by_qb(this.selected_question['question_bank']);
    }

   
    this.addSectionChange();
  }

  questionBankChange(event) {
    this.get_question_by_qb(event.value);
  }

  sectionQuestionBankChange(event, i){

    this.get_section_question_by_qb(event.value , i);
  }

  sectionQuestionChange(event, i){
    let max = event.value.length;
    this.sections.controls[i].get('show_question_count').setValue(max);
   
  }

  questionChange(event) {
  
    let max = event.value.length;
    this.show_question_count_max = max;
    this.exam_form['show_question_count'] = max;

    var group = event.value.reduce((r, a) => {
      r[a.question_bank_id] = [...(r[a.question_bank_id] || []), a];
      return r;
    }, {});

    let qArr = [];
    for (const [key, value] of Object.entries(group)) {
      qArr.push({ question_bank_id: key, questions: value });
    }

    this.examService.examDetails.questions = qArr;
  }

  prevPage() {
    this.router.navigate(['main/create-exam/settings']);
  }

  addSectionChange(){

  this.examService.examDetails.add_section = this.add_section;

    if(this.add_section === 'Yes'){
      this.selected_question = [];
      this.examService.examDetails.selected_question = this.selected_question;
      this.examService.examDetails.questions = this.selected_question;
      console.log(this.section);
      
      if(this.section?.length){
        this.section.forEach((data, i) => {
          this.addSection();
          this.get_section_question_by_qb(data.question_bank, i);
        });
        this.sections.patchValue(this.section);
        
      }else {
        if(!this.sections?.controls?.length){

          this.addSection();
        }
      }
    }

    if(this.add_section === 'No'){
      this.section = [];
      this.examService.examDetails.section = this.section;
      this.sections.controls.forEach((data, index) =>{
        this.removeSection(index);
      })
     
    }
    
   
    
  }

  nextPage() {
    this.submitted = true;
     

    
    if(this.add_section === 'Yes'){
      let data = this.create_assign_project_form.getRawValue();
      this.section = data.sections;
      console.log(data);
      this.examService.examDetails.section = this.section;
    }
    if(this.add_section === 'No'){
      if (!this.selected_question?.length) {
        if (
          !this.selected_question['question'] ||
          !this.selected_question['question'].length
        ) {
          return;
        }
      }
      console.log(this.selected_question);
      
    }
    // if (!this.selected_question.length) {
    //   if (
    //     !this.selected_question['question'] ||
    //     !this.selected_question['question'].length
    //   ) {
    //     return;
    //   }
    // }
    // let data = this.create_assign_project_form.getRawValue();
    // console.log(data);
    // return 0;
    this.router.navigate(['main/create-exam/publish']);
  }

  get_question_banks() {
    this.spinner = true;
    this.examService.get_all_question_bank().subscribe(
      (res: any) => {
        console.log(res);
        this.question_banks = res.data;
        this.spinner = false;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage,
        }).then(() => {
          this.spinner = false;
        });
      }
    );
  }

  get_question_by_qb(ids: []) {
    // console.log(ids);

    this.spinner = true;
    this.examService.get_question_by_qb(ids).subscribe(
      (res: any) => {
        this.QB_questions = res.data;
        // console.log(this.QB_questions);

        this.spinner = false;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage,
        }).then(() => {
          this.spinner = false;
        });
      }
    );
  }

  get_section_question_by_qb(ids: [], i) {
    // console.log(ids);

    this.spinner = true;
    this.examService.get_question_by_qb(ids).subscribe(
      (res: any) => {
        this.QB_section_questions[i] = res.data;
        // console.log(this.QB_questions);

        this.spinner = false;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage,
        }).then(() => {
          this.spinner = false;
        });
      }
    );
  }


  validation() {
    this.create_assign_project_form = this.fb.group({
      sections: this.fb.array([]),
    });
  }

  projects_form() {
    return this.fb.group({
        section_name: ['', Validators.required],
        description: ['', ],
        question_bank: ['', Validators.required],
        question: ['', Validators.required],
        show_question_count: ['', Validators.required],
       
      });
    }

  get sections() {
    return this.create_assign_project_form.get('sections') as FormArray;
  }



  addSection() {
    this.sections.push(this.projects_form());
    
  }

  removeSection(index: number) {
    if (this.sections.length > 1) {
      this.sections.removeAt(index);
    }
  }

  

}
