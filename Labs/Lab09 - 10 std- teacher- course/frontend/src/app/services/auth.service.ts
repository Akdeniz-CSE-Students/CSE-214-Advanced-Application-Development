import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/auth';
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser: Observable<User | null> = this.currentUserSubject.asObservable();
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    // LocalStorage'dan kullanıcı bilgisini kontrol et
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    if (!this.isBrowser) {
      return; // Tarayıcı olmayan ortamda çalışma
    }
    
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('currentUser');
      
      if (token && user) {
        this.currentUserSubject.next(JSON.parse(user));
      }
    } catch (error) {
      console.error('Kullanıcı bilgisi yüklenirken hata:', error);
      // Hata durumunda LocalStorage'ı temizle
      this.logout();
    }
  }

  login(username: string, password: string): Observable<any> {
    console.log('Login çağrıldı:', username);
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          console.log('Login response:', response);
          // JWT token'ı sakla
          if (response && response.token && this.isBrowser) {
            localStorage.setItem('token', response.token);
            
            // Kullanıcı bilgilerini elde etmek için token'ı decode et
            const user = this.getUserFromToken(response.token);
            
            if (user) {
              // Kullanıcı bilgilerini sakla
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
            }
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Login error:', error);
          
          // Hata mesajını döndür
          let errorMsg = 'Giriş işlemi sırasında bir hata oluştu.';
          
          if (error.status === 401) {
            errorMsg = error.error?.message || 'Geçersiz kullanıcı adı veya şifre. Lütfen tekrar deneyin.';
          }
          
          return throwError(() => new Error(errorMsg));
        })
      );
  }

  logout(): void {
    // LocalStorage'dan kullanıcı bilgilerini ve token'ı temizle
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
    }
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }
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

  // JWT token decode fonksiyonu
  private getUserFromToken(token: string): User | null {
    try {
      // JWT'nin payload kısmını alıp decode et
      const payload = token.split('.')[1];
      if (!payload) return null;
      
      // Base64 decode
      const decodedPayload = atob(payload);
      const user = JSON.parse(decodedPayload);
      
      return {
        id: user.id,
        username: user.sub || user.username, // JWT standartında subject kullanıcı adı olabilir
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