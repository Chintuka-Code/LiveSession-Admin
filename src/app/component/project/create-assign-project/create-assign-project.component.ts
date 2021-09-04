import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-assign-project',
  templateUrl: './create-assign-project.component.html',
  styleUrls: ['./create-assign-project.component.scss']
})
export class CreateAssignProjectComponent implements OnInit {

  create_assign_project_form: FormGroup;
  batch_List = [];
  batch_id = '';
  project_List = [];
  spinner: boolean = false;
  minDateValue:Date = new Date();
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private activated_route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activated_route.queryParams.subscribe((params) => {
      this.batch_id = params.batch_id;
      console.log(this.batch_id);
      
    });
    this.validation();
   

    this.get_batch_and_project();
  }

  validation() {
    this.create_assign_project_form = this.fb.group({
      batch_id: [this.batch_id, Validators.required],
      project_id: ['', Validators.required],
      projects: this.fb.array([]),
    });
  }

  projects_form(value) {
    return this.fb.group({
        project_id: [value._id, ],
        project_name: [value.name, ],
        due_date: ['', ],
       
      });
    }

  get projects() {
    return this.create_assign_project_form.get('projects') as FormArray;
  }

  projectChange(event){
    this.clearFormArray(this.create_assign_project_form.get('projects') as FormArray);
    event.value.forEach(element => {
      this.addProject(element)
    });

    console.log(event.value);
    
  }

  addProject(element) {
    this.projects.push(this.projects_form(element));
  }

  removeProject(index: number) {
    if (this.projects.length > 0) {
      this.projects.removeAt(index);
      
      this.removeFormArray(this.create_assign_project_form.controls['project_id'].value, index)
    }
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  removeFormArray(formArray, index) {
    formArray.splice(index, 1);
  }

  create_assign_project(){
    let data = this.create_assign_project_form.getRawValue();
    console.log(data);
// return 0;
    this.projectService.create_assigned_project(data).subscribe(
      (res:any) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Project Assigned',
        }).then(() => {
          this.spinner = false;
          this.create_assign_project_form.reset();
        });
        
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


  get_batch_and_project(){

    this.spinner = true;
    this.projectService.get_batch_and_project().subscribe(
      (res:any) => {
        console.log(res);
        this.project_List = res.projects
        this.batch_List = res.batches
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

}
