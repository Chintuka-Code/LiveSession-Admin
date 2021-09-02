import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-evaluator',
  templateUrl: './project-evaluator.component.html',
  styleUrls: ['./project-evaluator.component.scss']
})
export class ProjectEvaluatorComponent implements OnInit {

  project_evaluation_list:any = []
  gp_project_evaluation_list:any = []
  branchList = [];
  assignedBatchProject = [];
  spinner:boolean = false;
  menu_type: string;
  items: any = [{ label: 'Actions', items: [] }];
  projectSubmissions = [];

  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.setMenu();
    // this.getprojectEvaluation();
    this.getBranch();
  }


  getprojectEvaluation(){
    this.projectService.get_project_evaluation().subscribe((res:any)=>{
      this.project_evaluation_list = res.data;
      console.log(this.project_evaluation_list);
      
      let gp = this.groupByBatch(this.project_evaluation_list);
      this.gp_project_evaluation_list = Object.values(gp);
      this.branchList = Object.keys(gp);
      
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


  getBranch(){
    this.projectService.get_btanch().subscribe((res:any)=>{
      
      console.log(res);

      this.assignedBatchProject = res.assigned;
      this.projectService.assignedBatches = res.assigned;
      this.projectSubmissions = res.submission
      this.projectService.projectSubmissions = this.projectSubmissions;
      this.project_evaluation_list = res.submission;
    
      let gp = this.groupByBatch(this.project_evaluation_list);
      this.gp_project_evaluation_list = Object.values(gp);
      this.branchList = Object.keys(gp);
    
      
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
  }
  category_action(index) {

    switch (this.menu_type) {
      case 'view':
        console.log('view category');
        
        break;
      case 'edit':
        console.log('edit category');
        break;
      default:
        console.log('jkjkh');
    }
  }


  setMenu() {

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


  groupByBatch(data){
    const groups = data.reduce((groups, item) => {
      const group = (groups[item.batch_id.batch_name] || []);
      group.push(item);
      groups[item.batch_id.batch_name] = group;
      return groups;
    }, {});
    return groups;
  }

  statusCount(batch_id, status){

   
    let batch_submission = this.project_evaluation_list.filter(data=>data.batch_id._id === batch_id);
    console.log(this.project_evaluation_list);
    
    return batch_submission.filter(data =>data.status === status).length;
    // return this.gp_project_evaluation_list[index].filter(data =>data.status === status).length;
    // return 0;
  }


  submissionDetail(batch){
    
    // this.projectService.submissionDetail = this.gp_project_evaluation_list[index];
    this.projectService.batchDetail = batch;
    this.projectService.batchSubmission = this.projectSubmissions.filter(data=>data.batch_id._id === batch.batch_id._id);

    // console.log(batch);
    // console.log(this.projectService.batchSubmission);
    
    
    return this.router.navigate(['/main/project/batch-project']);
  }

}
