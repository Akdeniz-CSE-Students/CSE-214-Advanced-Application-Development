import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  isStudent: boolean = true; // Varsayılan olarak öğrenci girişi seçili

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    // Öğrenci ve öğretmen formları için farklı doğrulama kuralları
    if (this.isStudent) {
      this.loginForm = this.fb.group({
        studentNumber: ['', [Validators.required, Validators.minLength(5)]]
      });
    } else {
      this.loginForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
  }

  // Öğrenci/Öğretmen seçeneğini değiştirme
  toggleUserType(): void {
    this.isStudent = !this.isStudent;
    this.initForm(); // Formu yeniden oluştur
    this.errorMessage = ''; // Hata mesajını temizle
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    if (this.isStudent) {
      const studentNumber = this.loginForm.get('studentNumber')?.value;
      // Öğrenci girişi - studentNumber kullanarak giriş yap
      this.authService.login(studentNumber, studentNumber) // Backend'de studentNumber, password olarak da kullanılabilir
        .subscribe({
          next: () => {
            this.isLoading = false;
            // Öğrenci sayfasına yönlendir
            this.router.navigate(['/student/dashboard']);
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = 'Geçersiz öğrenci numarası. Lütfen tekrar deneyin.';
            console.error('Giriş hatası:', err);
          }
        });
    } else {
      // Öğretmen girişi - username ve password kullanarak giriş yap
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      
      this.authService.login(username, password)
        .subscribe({
          next: () => {
            this.isLoading = false;
            // Öğretmen sayfasına yönlendir
            this.router.navigate(['/teacher/dashboard']);
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = 'Geçersiz kullanıcı adı veya şifre. Lütfen tekrar deneyin.';
            console.error('Giriş hatası:', err);
          }
        });
    }
  }
}
