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
        path: 'edit-blog/:blog_id',
        loadChildren: () =>
          import('../edit-blog/edit-blog.module').then((m) => m.EditBlogModule),
      },
      {
        path: 'create-blog',
        data: { role: 'BLOG01' },
        loadChildren: () =>
          import('../create-blog/create-blog.module').then(
            (m) => m.CreateBlogModule
          ),
      },
      {
        path: 'view-tickets/:type',
        loadChildren: () =>
          import('../view-ticket/view-ticket.module').then(
            (m) => m.ViewTicketModule
          ),
      },
      {
        path: 'my-tickets/:type',
        loadChildren: () =>
          import('../my-tickets/my-tickets.module').then(
            (m) => m.MyTicketsModule
          ),
      },
      {
        path: 'custom-fields',
        loadChildren: () =>
          import('../custom-fields/custom-fields.module').then(
            (m) => m.CustomFieldsModule
          ),
      },
      {
        path: 'view-custom-fields',
        loadChildren: () =>
          import('../view-custom-fields/view-custom-fields.module').then(
            (m) => m.ViewCustomFieldsModule
          ),
      },
      {
        path: 'ticket-details/:ticket_id',
        loadChildren: () =>
          import('../ticket-details/ticket-details.module').then(
            (m) => m.TicketDetailsModule
          ),
      },
      {
        path: 'create-priority',
        loadChildren: () =>
          import('../create-priority/create-priority.module').then(
            (m) => m.CreatePriorityModule
          ),
      },
      {
        path: 'view-priority',
        loadChildren: () =>
          import('../view-priority/view-priority.module').then(
            (m) => m.ViewPriorityModule
          ),
      },
      {
        path: 'batch-student/:batch_id/:batch_name',
        loadChildren: () =>
          import('../view-batch-student/view-batch-student.module').then(
            (m) => m.ViewBatchStudentModule
          ),
      },
      {
        path: 'view-question-bank',
        loadChildren: () =>
          import('../view-question-bank/view-question-bank.module').then(
            (m) => m.ViewQuestionBankModule
          ),
      },
      {
        path: 'create-question-bank',
        loadChildren: () =>
          import('../create-question-bank/create-question-bank.module').then(
            (m) => m.CreateQuestionBankModule
          ),
      },
      {
        path: 'view-question',
        loadChildren: () =>
          import('../view-question/view-question.module').then(
            (m) => m.ViewQuestionModule
          ),
      },
      {
        path: 'create-question',
        loadChildren: () =>
          import('../create-question/create-question.module').then(
            (m) => m.CreateQuestionModule
          ),
      },
      {
        path: 'view-exam',
        loadChildren: () =>
          import('../view-exam/view-exam.module').then((m) => m.ViewExamModule),
      },
      {
        path: 'create-exam',
        loadChildren: () =>
          import('../create-exam/create-exam.module').then(
            (m) => m.CreateExamModule
          ),
      },
      {
        path: 'change-batch/:student_id',
        loadChildren: () =>
          import('../change-batch/change-batch.module').then(
            (m) => m.ChangeBatchModule
          ),
      },
      {
        path: 'live-session-multi',
        loadChildren: () =>
          import('../live-session-multi/live-session-multi.module').then(
            (m) => m.LiveSessionMultiModule
          ),
      },
      {
        path: 'manager-view',
        loadChildren: () =>
          import('../manager-view/manager-view.module').then(
            (m) => m.ManagerViewModule
          ),
      },
      {
        path: 'end-all-chats',
        loadChildren: () =>
          import('../end-all-chats/end-all-chats.module').then(
            (m) => m.EndAllChatsModule
          ),
      },
      {
        path: 'view-log',
        loadChildren: () =>
          import('../log/log.module').then((m) => m.LogModule),
      },
      {
        path: 'project',
        loadChildren: () =>
          import('../project/project.module').then((m) => m.ProjectModule),
      },
      {
        path: 'edit-question-bank/:question_bank_id',
        loadChildren: () =>
          import('../edit-question-bank/edit-question-bank.module').then(
            (m) => m.EditQuestionBankModule
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
