import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  increaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item, true);
  }

  decreaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item, false);
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }
}
