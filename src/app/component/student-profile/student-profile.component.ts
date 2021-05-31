import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { StudentsService } from 'src/app/service/students.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
})
export class StudentProfileComponent implements OnInit {
  spinner: boolean = false;
  user_info: any;
  student_info: any;
  student_id: string;
  constructor(
    private student_service: StudentsService,
    private activated_route: ActivatedRoute,
    private router: Router
  ) {}

  // get current user profile
  get_student_info() {
    this.spinner = true;
    this.student_service.get_student_details_id(this.student_id).subscribe(
      (res: any) => {
        this.student_info = res.data;
        this.spinner = false;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage,
        }).then(() => {
          this.router.navigate(['/main']);
        });
      }
    );
  }

  ngOnInit(): void {
    this.student_id = this.activated_route.snapshot.params.student_id;
    this.get_student_info();
  }
}
