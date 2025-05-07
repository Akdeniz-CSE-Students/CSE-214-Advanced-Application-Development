import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Course } from '../models/course';
import { Student } from '../models/student';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = environment.apiUrl + '/api/teacher';

  constructor(private http: HttpClient) { }

  // Tüm öğretmenleri getir
  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }

  // ID'ye göre öğretmen getir
  getTeacherById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${id}`);
  }

  // Öğretmen oluştur
  createTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl, teacher);
  }

  // Öğretmen güncelle
  updateTeacher(id: number, teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.apiUrl}/${id}`, teacher);
  }

  // Öğretmen sil
  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Öğretmene atanmış öğrencileri getir
  getAssignedStudents(teacherId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students?teacherId=${teacherId}`);
  }

  // Öğretmenin bekleyen ders taleplerini getir
  getPendingCourses(teacherId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses/pending?teacherId=${teacherId}`);
  }

  // Ders talebini onayla
  approveCourse(courseId: number): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/courses/approve/${courseId}`, {});
  }

  // Ders talebini reddet
  rejectCourse(courseId: number): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/courses/reject/${courseId}`, {});
  }
} 