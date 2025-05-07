import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Course } from '../models/course';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = environment.apiUrl + '/api/student';

  constructor(private http: HttpClient) { }

  // Tüm öğrencileri getir
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  // ID'ye göre öğrenci getir
  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  // Öğrenci oluştur
  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  // Öğrenci güncelle
  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  // Öğrenci sil
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Öğrencinin tüm derslerini getir
  getStudentCourses(studentId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses/all?studentId=${studentId}`);
  }

  // Öğrencinin bekleyen derslerini getir
  getPendingCourses(studentId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses/pending?studentId=${studentId}`);
  }

  // Öğrencinin onaylanmış derslerini getir
  getApprovedCourses(studentId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses/approved?studentId=${studentId}`);
  }

  // Tüm mevcut dersleri getir (öğrencinin kaydolabileceği dersler)
  getAllAvailableCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses/available`);
  }

  // Öğrenci için yeni ders ekle
  addCourse(studentId: number, course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/courses/add?studentId=${studentId}`, course);
  }
  
  // Mevcut bir derse kayıt ol
  enrollCourse(studentId: number, courseId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/courses/enroll`, {
      studentId: studentId,
      courseId: courseId
    });
  }
} 