import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { StudentListComponent } from './student-list/student-list.component';
import { PendingCoursesComponent } from './pending-courses/pending-courses.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: TeacherDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'TEACHER' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: TeacherDashboardComponent },
      { path: 'students', component: StudentListComponent },
      { path: 'pending-courses', component: PendingCoursesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
