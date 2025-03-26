import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  cities: string[] = ['Antalya', 'Isparta', 'İstanbul', 'Amasya'];
  showOptionalEmail: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      optionalEmail: new FormControl(''),
      city: new FormControl('', Validators.required),
      otherCity: new FormControl('')
    });
  }

  toggleOptionalEmail() {
    this.showOptionalEmail = !this.showOptionalEmail;
  }

  onCityChange(event: any) {
    const selectedCity = event.target.value;
    const otherCityControl = this.signupForm.get('otherCity');
    if (selectedCity === 'other') {
      otherCityControl?.enable();
    } else {
      otherCityControl?.disable();
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      if (userData.city === 'other') {
        userData.city = userData.otherCity;
      }
      this.userService.setUser(userData);
      this.router.navigate(['/login']);
    }
  }
}
