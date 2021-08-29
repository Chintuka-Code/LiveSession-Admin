import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../../service/project.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-project',
  templateUrl: './assign-project.component.html',
  styleUrls: ['./assign-project.component.scss']
})
export class AssignProjectComponent implements OnInit {

  spinner:boolean = false;
  menu_type: string;
  items: any = [{ label: 'Actions', items: [] }];

  assigned_project_list = [];

  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.setMenu();
    this.getAllAssignedProject()
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

  getAllAssignedProject(){
    this.projectService.get_assigned_project().subscribe((res:any)=>{
      if(res.data)
        this.assigned_project_list = res.data.map(data=>data.batch_id);
      console.log(this.assigned_project_list);
      
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


    assignProject(){
      this.router.navigate(['/main/project/create-assign-project']);
    }

}
