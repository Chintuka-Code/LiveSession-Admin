import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../../service/project.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  spinner:boolean = false;
  menu_type: string;
  items: any = [{ label: 'Actions', items: [] }];

  category_list = [];
  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.setMenu();
    this.getAllCategory()
  }

  createCategory(){
    this.router.navigate(['/main/project/create-category']);
  }

  getAllCategory(){
    this.projectService.get_all_category().subscribe((res:any)=>{
      this.category_list = res.categories;
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


  category_action(category) {
    console.log(category);

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

}
