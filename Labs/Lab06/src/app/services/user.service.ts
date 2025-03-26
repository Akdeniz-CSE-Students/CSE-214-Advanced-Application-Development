import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any;
  private isAuthenticated: boolean = false;

  setUser(user: any) {
    this.user = user;
    // local storage'a kaydet
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    // user yoksa local storage'dan al
    if (!this.user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    }
    return this.user;
  }

  login(email: string, password: string): boolean {
    const storedUser = this.getUser();
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated = false;
    this.user = null;
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
