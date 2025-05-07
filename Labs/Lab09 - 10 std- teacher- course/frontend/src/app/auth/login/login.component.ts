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
    // Basitleştirilmiş form validasyonu
    if (this.isStudent) {
      this.loginForm = this.fb.group({
        studentNumber: ['', [Validators.required]]
      });
    } else {
      this.loginForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
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
      console.log('Öğrenci girişi deneniyor:', studentNumber);
      
      // Öğrenci giriş denemesi - öğrenci numarası ve aynı şifre
      this.login(studentNumber, studentNumber);
    } else {
      // Öğretmen girişi
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      console.log('Öğretmen girişi deneniyor:', username);
      
      // Test modu - öğretmenler için default şifre: 1234
      this.login(username, password || '1234');
    }
  }

  // Basitleştirilmiş login işlemi 
  private login(username: string, password: string): void {
    console.log('Login gönderiliyor:', username, password);
    
    this.authService.login(username, password)
      .subscribe({
        next: (response) => {
          console.log('Giriş başarılı!', response);
          this.isLoading = false;
          
          // Rol bazlı yönlendirme
          if (this.authService.isStudent()) {
            this.router.navigate(['/student/dashboard']);
          } else if (this.authService.isTeacher()) {
            this.router.navigate(['/teacher/dashboard']);
          } else {
            // Role bulunamadıysa ana sayfaya yönlendir
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          console.error('Giriş hatası:', err);
          this.isLoading = false;
          
          // Kullanıcı dostu hata mesajı
          this.errorMessage = err.message || 'Giriş yapılamadı. Lütfen bilgilerinizi kontrol ediniz.';
        }
      });
  }
}
