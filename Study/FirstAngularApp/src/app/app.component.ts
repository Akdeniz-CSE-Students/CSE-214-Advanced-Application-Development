import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { HomeComponent } from "./components/home/home.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CurrencyPipe, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FirstAngularApp';
}
