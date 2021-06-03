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
      {
        path: 'view-batch',
        loadChildren: () =>
          import('../view-batch/view-batch.module').then(
            (m) => m.ViewBatchModule
          ),
      },
      {
        path: 'edit-batch/:batch_id',
        loadChildren: () =>
          import('../edit-batch/edit-batch.module').then(
            (m) => m.EditBatchModule
          ),
      },
      {
        path: 'create-batch',
        data: { role: 'B10' },
        loadChildren: () =>
          import('../create-batch/create-batch.module').then(
            (m) => m.CreateBatchModule
          ),
      },
      {
        path: 'add-student-into-batch/:batch_id/:batch_name',
        loadChildren: () =>
          import(
            '../add-student-into-batch/add-student-into-batch.module'
          ).then((m) => m.AddStudentIntoBatchModule),
      },
      {
        path: 'assign-batch-to-admin/:user_id',
        loadChildren: () =>
          import('../assign-batch-to-admin/assign-batch-to-admin.module').then(
            (m) => m.AssignBatchToAdminModule
          ),
      },
      {
        path: 'live-session-chat',
        loadChildren: () =>
          import('../live-session-chat/live-session-chat.module').then(
            (m) => m.LiveSessionChatModule
          ),
      },
      {
        path: 'trainer-mode',
        loadChildren: () =>
          import('../trainer-mode/trainer-mode.module').then(
            (m) => m.TrainerModeModule
          ),
      },
      {
        path: 'update-password',
        loadChildren: () =>
          import('../update-password/update-password.module').then(
            (m) => m.UpdateProfileModule
          ),
      },
      {
        path: 'update-student/:student_id',
        loadChildren: () =>
          import(
            '../update-student-profile/update-student-profile.module'
          ).then((m) => m.UpdateStudentProfileModule),
      },
      {
        path: 'view-category',
        loadChildren: () =>
          import('../view-category/view-category.module').then(
            (m) => m.ViewCategoryModule
          ),
      },
      {
        path: 'create-category',
        data: { role: 'CAT10' },
        loadChildren: () =>
          import('../create-category/create-category.module').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: 'edit-category/:category_id',
        loadChildren: () =>
          import('../edit-category/edit-category.module').then(
            (m) => m.EditCategoryModule
          ),
      },
      {
        path: 'view-blog',
        loadChildren: () =>
          import('../view-blog/view-blog.module').then((m) => m.ViewBlogModule),
      },
      {
        path: 'edit-blog/blog_id',
        loadChildren: () =>
          import('../edit-blog/edit-blog.module').then((m) => m.EditBlogModule),
      },
      {
        path: 'create-blog',
        loadChildren: () =>
          import('../create-blog/create-blog.module').then(
            (m) => m.CreateBlogModule
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
