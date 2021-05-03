import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from '../../component/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'create-user',
        data: { role: 'U01' },
        loadChildren: () =>
          import('../create-user/create-user.module').then(
            (m) => m.CreateUserModule
          ),
      },
      {
        path: 'user-details/:user_type',
        loadChildren: () =>
          import('../user-details/user-details.module').then(
            (m) => m.UserDetailsModule
          ),
      },
      {
        path: 'students-details/:user_type',
        loadChildren: () =>
          import('../students-details/students-details.module').then(
            (m) => m.StudentsDetailsModule
          ),
      },
      {
        path: 'edit-user/:user_id',
        loadChildren: () =>
          import('../edit-user/edit-user.module').then((m) => m.EditUserModule),
      },
      {
        path: 'view-user-profile/:user_id',
        loadChildren: () =>
          import('../view-user-profile/view-user-profile.module').then(
            (m) => m.ViewUserProfileModule
          ),
      },
      {
        path: 'create-subject',
        data: { role: 'SUB01' },
        loadChildren: () =>
          import('../create-subject/create-subject.module').then(
            (m) => m.CreateSubjectModule
          ),
      },
      {
        path: 'view-subject',
        loadChildren: () =>
          import('../view-subject/view-subject.module').then(
            (m) => m.ViewSubjectModule
          ),
      },
      {
        path: 'create-course',
        data: { role: 'C10' },
        loadChildren: () =>
          import('../create-course/create-course.module').then(
            (m) => m.CreateCourseModule
          ),
      },
      {
        path: 'view-course',
        loadChildren: () =>
          import('../view-course/view-course.module').then(
            (m) => m.ViewCourseModule
          ),
      },
      {
        path: 'edit-course/:course_id',
        loadChildren: () =>
          import('../edit-course/edit-course.module').then(
            (m) => m.EditCourseModule
          ),
      },
      {
        path: 'create-student',
        data: { role: 'CS10' },
        loadChildren: () =>
          import('../create-student/create-student.module').then(
            (m) => m.CreateStudentModule
          ),
      },
      {
        path: 'student-profile/:student_id',
        loadChildren: () =>
          import('../student-profile/student-profile.module').then(
            (m) => m.StudentProfileModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
