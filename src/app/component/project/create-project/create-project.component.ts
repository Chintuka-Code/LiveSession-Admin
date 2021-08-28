import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
import { AttachmentService } from 'src/app/service/attachment.service';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {


  create_project_form: FormGroup;
  spinner: boolean = false;
  project_category_list = []
  files: any[] = [];

  constructor(
    private fb: FormBuilder,
    private activated_route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private attachment_service: AttachmentService,
  ) { }

  ngOnInit(): void {
    this.validation();
    this.getAllCategory();
  }

  validation() {
    this.create_project_form = this.fb.group({
      name: ['', Validators.required],
      project_category: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', ],
      total_marks: ['', ],
      is_marking_scheme:[false, Validators.required],
      marking_schemes: this.fb.array([this.marking_schemes_form()]),
     
      links: new FormArray([new FormControl('', )]),
    });
  }

  marking_schemes_form() {
  return this.fb.group({
      name: ['', ],
      value: ['', ],
     
    });
  }

  get links() {
    return this.create_project_form.get('links') as FormArray;
  }

  addTag() {
    this.links.push(new FormControl('', ));
  }

  removeTag(index: number) {
    if (this.links.length > 1) {
      this.links.removeAt(index);
    }
  }

  get marking_schemes() {
    return this.create_project_form.get('marking_schemes') as FormArray;
  }

  addMarkingScheme() {
    this.marking_schemes.push(this.marking_schemes_form());
  }

  removeMarkingScheme(index: number) {
    if (this.marking_schemes.length > 1) {
      this.marking_schemes.removeAt(index);
    }
  }

  getAllCategory(){
    this.projectService.get_all_category().subscribe((res:any)=>{
      this.project_category_list = res.categories;
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
    )};


  async create_project() {
    this.spinner = true;
    let data = this.create_project_form.getRawValue();


    if (this.files.length > 0) {
      const file_url: any = await this.attachment_service.upload_files(
        this.files
      );
      data['attachment'] = FormativeData.concat_url_with_files(
        file_url.files_paths
      );
    }

    console.log(data);
    // return 0;
    this.projectService.create_project(data).subscribe(
      (res) => {
        console.log(res);
        
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Project Created',
        }).then(() => {
          this.spinner = false;
          this.create_project_form.reset();
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

    // attachment
    attchment(event) {
      // this.files = [];
      for (let i = 0; i < event.target.files.length; i++) {
        this.files.push(event.target.files[i]);
      }
    }

    


}
