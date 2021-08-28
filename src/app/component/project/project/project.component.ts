import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProjectService} from '../../../service/project.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {


  spinner:boolean = false;
  menu_type: string;
  items: any = [{ label: 'Actions', items: [] }];

  project_list = [];

  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.setMenu();
    this.getAllProject()
  }


  getAllProject(){
    this.projectService.get_all_project().subscribe((res:any)=>{
      this.project_list = res.projects;
      console.log(res);
      
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

  createCategory(){
    this.router.navigate(['/main/project/create-project']);
  }


  setMenu() {
    // this.spinner = true;

    this.items[0].items.push({
      label: 'View',
      icon: 'pi pi-eye',
      command: () => {
        this.menu_type = 'view';
      },
    });
    
    this.items[0].items.push({
      label: 'Edit',
      icon: 'pi pi-user-edit',
      command: () => {
        this.menu_type = 'edit';
      },
    });

  }

  project_action(project) {
    console.log(project);

    switch (this.menu_type) {
      case 'view':
        console.log('view project');
        break;
      case 'edit':
        console.log('edit project');
        break;
      default:
        console.log('jkjkh');
    }
  }
}
