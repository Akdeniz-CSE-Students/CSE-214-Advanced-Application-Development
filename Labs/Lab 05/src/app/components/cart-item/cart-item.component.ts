import { CartItem } from './../../services/cart.service';
import { CartService } from './../../services/cart.service';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
  standalone: false,
})
export class CartItemComponent {
  @Input() item!: CartItem;

  constructor(private cartService: CartService) { }

  increase() {
    this.cartService.increaseQuantity(this.item.product.id);
  }

  decrease() {
    this.cartService.decreaseQuantity(this.item.product.id);
  }

  remove() {
    this.cartService.removeFromCart(this.item.product.id);
  }
}
