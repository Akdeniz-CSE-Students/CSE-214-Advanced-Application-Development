import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/auth';
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // LocalStorage'dan kullanıcı bilgisini kontrol et
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          // JWT token'ı sakla
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            
            // Kullanıcı bilgilerini elde etmek için token'ı decode et (basit implementasyon)
            const user = this.getUserFromToken(response.token);
            
            // Kullanıcı bilgilerini sakla
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
        })
      );
  }

  logout(): void {
    // LocalStorage'dan kullanıcı bilgilerini ve token'ı temizle
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  isStudent(): boolean {
    return this.currentUserValue?.role === 'STUDENT';
  }

  isTeacher(): boolean {
    return this.currentUserValue?.role === 'TEACHER';
  }

  // Basit bir token decode fonksiyonu (gerçekte daha complex olabilir)
  private getUserFromToken(token: string): User | null {
    try {
      // JWT'nin payload kısmını alıp decode et
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const user = JSON.parse(decodedPayload);
      
      return {
        id: user.id,
        username: user.sub, // JWT standartında subject kullanıcı adı olabilir
        name: user.name || '',
        surname: user.surname || '',
        email: user.email || '',
        role: user.role || 'STUDENT'
      };
    } catch (err) {
      console.error('Token decode hatası:', err);
      return null;
    }
  }
} 