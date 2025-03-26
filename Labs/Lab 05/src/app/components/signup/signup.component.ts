import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSignup() {
    this.authService.addUser({ username: this.username, password: this.password });
    alert('Signup successful! You can now login.');
    this.router.navigate(['/login']); // Kayıt başarılı olduğunda login sayfasına yönlendirme
  }
}
