import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { CourseListComponent } from './course-list/course-list.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: StudentDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'STUDENT' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: StudentDashboardComponent },
      { path: 'courses', component: CourseListComponent },
      { path: 'add-course', component: AddCourseComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
