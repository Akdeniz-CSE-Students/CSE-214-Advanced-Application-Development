import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from '../../models/course';
import { CourseStatus } from '../../models/course-status';
import { StudentService } from '../../services/student.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-course',
  standalone: false,
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss'
})
export class AddCourseComponent implements OnInit {
  courseForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      return;
    }

    this.isLoading = true;
    const studentId = this.authService.currentUserValue?.id;
    
    if (!studentId) {
      this.snackBar.open('Öğrenci bilgisi bulunamadı!', 'Tamam', { duration: 3000 });
      this.isLoading = false;
      return;
    }

    // Kurs nesnesini hazırla
    const newCourse: Course = {
      ...this.courseForm.value,
      status: CourseStatus.PENDING
    };

    // StudentService üzerinden kurs ekle
    this.studentService.addCourse(studentId, newCourse).subscribe({
      next: () => {
        this.snackBar.open('Kurs başarıyla eklendi ve öğretmen onayı için beklemede!', 'Tamam', { duration: 3000 });
        this.isLoading = false;
        this.router.navigate(['/student/dashboard']);
      },
      error: (error: any) => {
        console.error('Kurs eklenirken hata oluştu:', error);
        this.snackBar.open('Kurs eklenirken bir hata oluştu!', 'Tamam', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }
}
