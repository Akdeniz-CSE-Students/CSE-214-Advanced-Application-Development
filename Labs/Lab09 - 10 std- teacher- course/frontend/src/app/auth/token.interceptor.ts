import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  /**
   * Basit kimlik doğrulama tabanlı sistemde interceptor'a gerek yok
   * Sadece boş bir şekilde istekleri geçiriyoruz
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Artık token'a gerek yok, doğrudan isteği iletiyoruz
    return next.handle(request);
    
    /*
    // Eski JWT tabanlı kod:
    // const token = this.authService.getToken();
    // if (token) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });
    // }
    // return next.handle(request);
    */
  }
}
