import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    if (this.authService.validateUser(this.username, this.password)) {
      alert('Login successful!');
      // Admin kullanıcısı için admin paneline yönlendirme
      if (this.username === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/product-list']);
      }
    } else {
      alert('Invalid username or password');
    }
  }
}
