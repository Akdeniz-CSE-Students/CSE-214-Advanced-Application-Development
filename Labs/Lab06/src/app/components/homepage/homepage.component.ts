import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  imports: [CommonModule, RouterModule]
})
export class HomepageComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.user = this.userService.getUser();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
