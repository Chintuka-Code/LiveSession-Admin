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
  evaluatorList = []
  batchList:any = [] ;

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
    this.items[0].items.push({
      label: 'Assign Project',
      icon: 'pi pi-user-edit',
      command: () => {
        this.menu_type = 'assign_project';
      },
    });
    
    this.items[0].items.push({
      label: 'Assign Project Evaluator',
      icon: 'pi pi-user-edit',
      command: () => {
        this.menu_type = 'evaluator';
      },
    });


  }

  assign_action(batch) {
    console.log(batch);

    switch (this.menu_type) {
      case 'view':
        console.log('view category');
        
        break;
      case 'edit':
        console.log('edit category');
        break;
      case 'evaluator':
        this.router.navigate(['/main/project/evaluator'], { queryParams: { batch_id: batch._id} });
        break;
      case 'assign_project':
        this.router.navigate(['/main/project/create-assign-project'], { queryParams: { batch_id: batch._id} });
        break;
      default:
        console.log('jkjkh');
    }
  }


  getAllAssignedProject(){
    this.projectService.get_assigned_project().subscribe((res:any)=>{
      this.batchList = res.batches;
      if(res.data)
        this.assigned_project_list = res.data
    },
    (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.errorMessage,
      }).then(() => {
        this.spinner = false;
      });
    })
  };


    assignProject(){
      this.router.navigate(['/main/project/create-assign-project']);
    }

    projectCount(batch_id){

      let currentBatchProject = this.currentBatchProject(batch_id);
      if(currentBatchProject){
        return currentBatchProject.projects.length;
      }
      return 0
    }

    currentBatchProject(batch_id){
      return this.assigned_project_list.find(batch => batch.batch_id === batch_id)
    }
    evaluatorName(batch_id){

      let currentBatchProject = this.currentBatchProject(batch_id);
      if(currentBatchProject){
        return currentBatchProject.evaluator.map(data=>data.name).toString();
      }
      return 0;
    }

}
