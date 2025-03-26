import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  users: User[] = [];
  newUser: User = { username: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.refreshUsers();
  }

  refreshUsers() {
    this.users = this.authService.getUsers();
  }

  addUser() {
    if (this.newUser.username && this.newUser.password) {
      this.authService.addUser({ ...this.newUser });
      this.newUser = { username: '', password: '' };
      this.refreshUsers();
    }
  }

  removeUser(username: string) {
    if (username !== 'admin') { // Prevent removing admin user
      this.authService.removeUser(username);
      this.refreshUsers();
    }
  }

  goToShoppingList() {
    this.router.navigate(['/product-list']);
  }
}
