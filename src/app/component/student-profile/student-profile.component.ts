import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/service/students.service';

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
    private activated_route: ActivatedRoute
  ) {}

  // get current user profile
  get_student_info() {
    this.spinner = true;
    this.student_service.get_student_by_id(this.student_id).subscribe((res) => {
      this.student_info = res.data();
      console.log(this.student_info);
      this.spinner = false;
    });
  }

  ngOnInit(): void {
    this.student_id = this.activated_route.snapshot.params.student_id;
    this.get_student_info();
  }
}
