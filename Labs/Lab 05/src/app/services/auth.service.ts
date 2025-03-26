import { Injectable } from '@angular/core';

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { username: 'admin', password: 'admin' },
    { username: 'efe', password: 'efe' },
    { username: 'efe2', password: 'efe2' }
  ];

  currentUser: string | null = null;

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  removeUser(username: string): void {
    this.users = this.users.filter(user => user.username !== username);
  }

  validateUser(username: string, password: string): boolean {
    const isValid = this.users.some(u => u.username === username && u.password === password);
    if (isValid) {
      this.currentUser = username;
    }
    return isValid;
  }

  logout(): void {
    this.currentUser = null;
  }
}
