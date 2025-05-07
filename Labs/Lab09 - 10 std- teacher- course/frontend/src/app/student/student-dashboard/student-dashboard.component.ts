import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from '../../models/student';
import { Course } from '../../models/course';
import { CourseStatus } from '../../models/course-status';
import { StudentService } from '../../services/student.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: false,
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent implements OnInit {
  studentInfo: Student | null = null;
  allCourses: Course[] = [];
  pendingCourses: Course[] = [];
  approvedCourses: Course[] = [];
  selectedTabIndex = 0;
  isLoading = false;

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadStudentInfo();
    this.loadAllCourses();
    this.loadStudentCourses();
  }

  loadStudentInfo(): void {
    this.isLoading = true;
    const studentId = this.authService.currentUserValue?.id;
    
    if (studentId) {
      this.studentService.getStudentById(studentId).subscribe({
        next: (student: Student) => {
          this.studentInfo = student;
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Öğrenci bilgileri yüklenirken hata oluştu:', error);
          this.isLoading = false;
        }
      });
    }
  }

  loadAllCourses(): void {
    this.isLoading = true;
    this.studentService.getAllAvailableCourses().subscribe({
      next: (courses: Course[]) => {
        this.allCourses = courses;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Kurslar yüklenirken hata oluştu:', error);
        this.isLoading = false;
      }
    });
  }

  loadStudentCourses(): void {
    this.isLoading = true;
    const studentId = this.authService.currentUserValue?.id;
    
    if (studentId) {
      // Bekleyen kursları yükle
      this.studentService.getStudentCourses(studentId).subscribe({
        next: (courses: Course[]) => {
          // Kursları durumlarına göre ayır
          this.pendingCourses = courses.filter(course => course.status === CourseStatus.PENDING);
          this.approvedCourses = courses.filter(course => course.status === CourseStatus.APPROVED);
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Öğrenci kursları yüklenirken hata oluştu:', error);
          this.isLoading = false;
        }
      });
    }
  }

  enrollCourse(courseId?: number): void {
    if (!courseId) {
      this.snackBar.open('Geçersiz kurs ID\'si!', 'Tamam', { duration: 3000 });
      return;
    }
    
    const studentId = this.authService.currentUserValue?.id;
    
    if (studentId) {
      this.isLoading = true;
      this.studentService.enrollCourse(studentId, courseId).subscribe({
        next: () => {
          this.snackBar.open('Kursa kayıt isteği gönderildi!', 'Tamam', { duration: 3000 });
          this.loadStudentCourses(); // Kursları yeniden yükle
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Kursa kayıt olurken hata oluştu:', error);
          this.snackBar.open('Kursa kayıt olurken bir hata oluştu!', 'Tamam', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.selectedTabIndex = event.index;
  }
}
