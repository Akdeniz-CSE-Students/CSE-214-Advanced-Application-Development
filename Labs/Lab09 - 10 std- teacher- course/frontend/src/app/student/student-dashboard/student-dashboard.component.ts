import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
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
    private authService: AuthService
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
        next: (student) => {
          this.studentInfo = student;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Öğrenci bilgileri yüklenirken hata oluştu:', error);
          this.isLoading = false;
        }
      });
    }
  }

  loadAllCourses(): void {
    this.isLoading = true;
    this.studentService.getAllCourses().subscribe({
      next: (courses) => {
        this.allCourses = courses;
        this.isLoading = false;
      },
      error: (error) => {
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
      this.studentService.getStudentCoursesByStatus(studentId, CourseStatus.PENDING).subscribe({
        next: (courses) => {
          this.pendingCourses = courses;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Bekleyen kurslar yüklenirken hata oluştu:', error);
          this.isLoading = false;
        }
      });

      // Onaylanan kursları yükle
      this.studentService.getStudentCoursesByStatus(studentId, CourseStatus.APPROVED).subscribe({
        next: (courses) => {
          this.approvedCourses = courses;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Onaylanan kurslar yüklenirken hata oluştu:', error);
          this.isLoading = false;
        }
      });
    }
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.selectedTabIndex = event.index;
  }
}
