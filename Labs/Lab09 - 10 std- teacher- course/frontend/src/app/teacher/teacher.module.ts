import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { StudentListComponent } from './student-list/student-list.component';
import { PendingCoursesComponent } from './pending-courses/pending-courses.component';



@NgModule({
  declarations: [
    TeacherDashboardComponent,
    StudentListComponent,
    PendingCoursesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TeacherModule { }
