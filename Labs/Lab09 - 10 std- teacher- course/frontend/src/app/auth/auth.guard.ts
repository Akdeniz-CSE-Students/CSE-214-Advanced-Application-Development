import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Kullanıcının oturum durumunu kontrol et
    if (this.authService.isLoggedIn()) {
      
      // Rol kontrolü - sadece belirli roller belirli sayfalara erişebilir
      const requiredRole = route.data['role'] as string;
      
      if (requiredRole) {
        // Eğer sayfa belirli bir rol gerektiriyorsa, bu role sahip mi kontrol et
        if (requiredRole === 'STUDENT' && this.authService.isStudent()) {
          return true;
        } 
        
        if (requiredRole === 'TEACHER' && this.authService.isTeacher()) {
          return true;
        }
        
        // Yetkisiz erişim, kullanıcının rolüne uygun sayfaya yönlendir
        if (this.authService.isStudent()) {
          return this.router.createUrlTree(['/student/dashboard']);
        } else if (this.authService.isTeacher()) {
          return this.router.createUrlTree(['/teacher/dashboard']);
        }
      }
      
      // Rol gerektirmeyen sayfalar için erişime izin ver
      return true;
    }
    
    // Oturum açılmamışsa giriş sayfasına yönlendir
    return this.router.createUrlTree(['/auth/login']);
  }
}
