import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Course } from '../models/course';
import { CourseStatus } from '../models/course-status';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = environment.apiUrl + '/api/courses';

  constructor(private http: HttpClient) { }

  // Tüm dersleri getir
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  // ID'ye göre ders getir
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  // Yeni ders oluştur
  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  // Ders güncelle
  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  // Dersi sil
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Status'e göre dersleri getir
  getCoursesByStatus(status: CourseStatus): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/status/${status}`);
  }

  // Öğretmene göre dersleri getir
  getCoursesByTeacher(teacherId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/teacher/${teacherId}`);
  }

  // Derse kayıtlı öğrencileri getir
  getStudentsByCourse(courseId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/${courseId}/students`);
  }

  // Derse öğrenci ekle
  addStudentToCourse(courseId: number, studentId: number): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/${courseId}/students/${studentId}`, {});
  }

  // Dersten öğrenciyi çıkar
  removeStudentFromCourse(courseId: number, studentId: number): Observable<Course> {
    return this.http.delete<Course>(`${this.apiUrl}/${courseId}/students/${studentId}`);
  }

  // Ders durumunu güncelle
  updateCourseStatus(courseId: number, status: CourseStatus): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${courseId}/status/${status}`, {});
  }
} 