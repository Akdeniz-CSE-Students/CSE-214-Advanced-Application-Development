import { Product } from '../../services/cart.service';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: false,
})
export class ProductListComponent {
  products: Product[] = [
    { id: 1, name: 'Product A', description: 'Description A', price: 50 },
    { id: 2, name: 'Product B', description: 'Description B', price: 30 },
    { id: 3, name: 'Product C', description: 'Description C', price: 20 }
  ];

  constructor(private cartService: CartService) { }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
