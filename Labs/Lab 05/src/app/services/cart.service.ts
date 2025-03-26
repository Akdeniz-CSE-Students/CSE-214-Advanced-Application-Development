import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cartSubject.asObservable();

  private updateCart() {
    this.cartSubject.next(this.cartItems);
  }

  addToCart(product: Product) {
    const item = this.cartItems.find(item => item.product.id === product.id);
    if (item) {
      item.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.updateCart();
  }

  increaseQuantity(productId: number) {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity++;
      this.updateCart();
    }
  }

  decreaseQuantity(productId: number) {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.removeFromCart(productId);
        return;
      }
      this.updateCart();
    }
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.updateCart();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }
}
