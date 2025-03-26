import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  title = 'Shopping Cart';

  products: Product[] = [
    { id: 1, name: 'Product A', description: 'Description A', price: 50 },
    { id: 2, name: 'Product B', description: 'Description B', price: 30 },
    { id: 3, name: 'Product C', description: 'Description C', price: 20 }
  ];

  cart: CartItem[] = [];
  purchaseAmount: number = 0;
  message: string = '';

  addToCart(product: Product) {
    const item = this.cart.find(item => item.product.id === product.id);
    if (item) {
      item.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeFromCart(item);
    }
  }

  removeFromCart(item: CartItem) {
    this.cart = this.cart.filter(cartItem => cartItem !== item);
  }

  get totalPrice(): number {
    return this.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  purchase() {
    if (this.purchaseAmount >= this.totalPrice) {
      this.message = 'Purchase successful!';
    } else {
      this.message = 'Error: Entered amount is less than total price.';
    }
  }
}
