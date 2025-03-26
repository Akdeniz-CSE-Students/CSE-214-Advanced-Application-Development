import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartListComponent } from "./components/cart-list/cart-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductListComponent, CartListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ShoppingCard';

}

