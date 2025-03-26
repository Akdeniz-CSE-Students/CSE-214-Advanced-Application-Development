import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { UserComponent } from './user.component';
import { MessageComponent } from './message.component';
import { CardComponent } from './card.component';
import { CartComponent } from './cart.component';
import { UserProfileComponent } from './user-profile.component';
import { QuestionsComponent } from './questions.component';

const routes: Routes = [
  {
    path: 'questions',
    component: QuestionsComponent,
    data: { title: 'All Questions' }
  },
  {
    path: 'question1',
    component: UserComponent,
    data: { title: 'Question 1: User Component Changes' }
  },
  {
    path: 'question2',
    component: CardComponent,
    data: { title: 'Question 2: Content Projection' }
  },
  {
    path: 'question3',
    component: MessageComponent,
    data: { title: 'Question 3: View Child Example' }
  },
  {
    path: 'question4',
    component: UserProfileComponent,
    data: { title: 'Question 4: Content Projection Changes' }
  },
  {
    path: 'question5',
    component: CartComponent,
    data: { title: 'Question 5: Cart Updates' }
  },
  { path: '', redirectTo: '/question1', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    MessageComponent,
    CardComponent,
    CartComponent,
    UserProfileComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
