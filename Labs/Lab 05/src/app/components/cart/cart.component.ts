import { CartService, CartItem } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: false
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  purchaseAmount: number = 0;
  purchaseMessage: string = '';
  purchaseSuccess: boolean = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  purchase() {
    if (this.purchaseAmount >= this.totalPrice) {
      this.purchaseMessage = 'Purchase successful!';
      this.purchaseSuccess = true;
      //this.cartService.clearCart();
    } else {
      this.purchaseMessage = 'Error: Entered amount is less than total price.';
      this.purchaseSuccess = false;
    }
  }
}
