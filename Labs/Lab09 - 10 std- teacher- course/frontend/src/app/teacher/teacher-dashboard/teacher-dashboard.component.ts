import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Teacher } from '../../models/teacher';
import { Student } from '../../models/student';
import { Course } from '../../models/course';
import { CourseStatus } from '../../models/course-status';
import { TeacherService } from '../../services/teacher.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: false,
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.scss'
})
export class TeacherDashboardComponent implements OnInit {
  teacherInfo: Teacher | null = null;
  assignedStudents: Student[] = [];
  pendingCourses: Course[] = [];
  selectedTabIndex = 0;
  isLoading = false;

  constructor(
    private teacherService: TeacherService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTeacherInfo();
    this.loadAssignedStudents();
    this.loadPendingCourses();
  }

  loadTeacherInfo(): void {
    this.isLoading = true;
    const teacherId = this.authService.currentUserValue?.id;
    
    if (teacherId) {
      this.teacherService.getTeacherById(teacherId).subscribe({
        next: (teacher: Teacher) => {
          this.teacherInfo = teacher;
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Öğretmen bilgileri yüklenirken hata oluştu:', error);
          this.isLoading = false;
        }
      });
    }
  }

  loadAssignedStudents(): void {
    this.isLoading = true;
    const teacherId = this.authService.currentUserValue?.id;
    
    if (teacherId) {
      this.teacherService.getAssignedStudents(teacherId).subscribe({
        next: (students: Student[]) => {
          this.assignedStudents = students;
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Atanmış öğrenciler yüklenirken hata oluştu:', error);
          this.isLoading = false;
        }
      });
    }
  }

  loadPendingCourses(): void {
    this.isLoading = true;
    const teacherId = this.authService.currentUserValue?.id;
    
    if (teacherId) {
      this.teacherService.getPendingCourses(teacherId).subscribe({
        next: (courses: Course[]) => {
          this.pendingCourses = courses;
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Bekleyen kurslar yüklenirken hata oluştu:', error);
          this.isLoading = false;
        }
      });
    }
  }

  approveCourse(courseId: number): void {
    this.isLoading = true;
    this.teacherService.approveCourse(courseId).subscribe({
      next: () => {
        // Bekleyen kursları yeniden yükle
        this.loadPendingCourses();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Kurs onaylanırken hata oluştu:', error);
        this.isLoading = false;
      }
    });
  }

  rejectCourse(courseId: number): void {
    this.isLoading = true;
    this.teacherService.rejectCourse(courseId).subscribe({
      next: () => {
        // Bekleyen kursları yeniden yükle
        this.loadPendingCourses();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Kurs reddedilirken hata oluştu:', error);
        this.isLoading = false;
      }
    });
  }

  viewStudentDetails(studentId: number): void {
    // Öğrenci detaylarını görmek için yönlendirme yapabilirsiniz
    this.router.navigate(['/teacher/students', studentId]);
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.selectedTabIndex = event.index;
  }
}
