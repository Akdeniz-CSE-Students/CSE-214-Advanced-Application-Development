import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cartSubject.asObservable();

  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }
    this.cartSubject.next([...this.cartItems]);
  }

  removeFromCart(item: CartItem) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.cartSubject.next([...this.cartItems]);
    }
  }

  updateQuantity(item: CartItem, increase: boolean) {
    const existingItem = this.cartItems.find(i => i.id === item.id);
    if (existingItem) {
      if (increase) {
        existingItem.quantity++;
      } else if (existingItem.quantity > 1) {
        existingItem.quantity--;
      } else {
        this.removeFromCart(item);
        return;
      }
      this.cartSubject.next([...this.cartItems]);
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItems(): CartItem[] {
    return [...this.cartItems];
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next([]);
  }
}
