import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <mat-toolbar color="primary">
        <span>Angular Lifecycle Hooks Examples</span>
      </mat-toolbar>

      <mat-sidenav-container>
        <mat-sidenav mode="side" opened>
          <mat-nav-list>
            <a mat-list-item routerLink="/questions">
              <mat-icon>list</mat-icon>
              Tüm Sorular
            </a>
            <a mat-list-item routerLink="/question1">
              <mat-icon>person</mat-icon>
              Question 1: User Component
            </a>
            <a mat-list-item routerLink="/question2">
              <mat-icon>content_copy</mat-icon>
              Question 2: Card Component
            </a>
            <a mat-list-item routerLink="/question3">
              <mat-icon>visibility</mat-icon>
              Question 3: View Child
            </a>
            <a mat-list-item routerLink="/question4">
              <mat-icon>account_box</mat-icon>
              Question 4: User Profile
            </a>
            <a mat-list-item routerLink="/question5">
              <mat-icon>shopping_cart</mat-icon>
              Question 5: Cart Component
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content>
          <div class="content-container">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    mat-sidenav-container {
      flex: 1;
    }

    mat-sidenav {
      width: 250px;
    }

    .content-container {
      padding: 20px;
    }

    mat-nav-list a {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  `]
})
export class AppComponent {
  title = 'Angular Yaşam Döngüsü Öğrenimi';
}