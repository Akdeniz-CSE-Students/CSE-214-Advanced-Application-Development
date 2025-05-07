import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';
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
    // LocalStorage'dan kullanıcı bilgisini yükle
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    try {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.currentUserSubject.next(JSON.parse(user));
      }
    } catch (error) {
      console.error('Kullanıcı bilgisi yüklenirken hata:', error);
      this.logout();
    }
  }

  login(username: string, password: string): Observable<any> {
    // Boş değer kontrolü
    if (!username) {
      return throwError(() => new Error('Kullanıcı adı gereklidir'));
    }

    console.log(`Login isteği gönderiliyor: ${username}`);
    
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          console.log('Giriş başarılı:', response);
          
          if (response) {
            // Kullanıcı bilgilerini sakla
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.currentUserSubject.next(response);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Login hatası:', error);
          
          let errorMsg = 'Giriş işlemi sırasında bir hata oluştu.';
          
          if (error.status === 401) {
            errorMsg = 'Geçersiz kullanıcı adı veya şifre.';
          } else if (error.status === 0) {
            errorMsg = 'Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.';
          } else if (error.error && error.error.message) {
            errorMsg = error.error.message;
          }
          
          return throwError(() => new Error(errorMsg));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }

  isStudent(): boolean {
    return this.currentUserValue?.role === 'STUDENT';
  }

  isTeacher(): boolean {
    return this.currentUserValue?.role === 'TEACHER';
  }
} 