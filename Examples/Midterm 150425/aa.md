# Angular E-Commerce Midterm Exam

<exam>
<instructions>
This midterm exam is designed to assess your understanding and practical application of Angular concepts in the context of e-commerce development. You have 100 minutes to complete all 6 questions. Read each question carefully and provide detailed answers as requested. You may use your own computer to write and test code, but internet access is not permitted except for official Angular documentation at angular.io. Ensure that your code is well-commented and follows Angular best practices. Points will be awarded for functionality, code quality, and adherence to Angular principles. Good luck!
</instructions>

<question1>
**Product Listing and Filtering (20 points)**

You are developing the product listing page for an e-commerce website. The page needs to display a list of products and allow users to filter products by category and sort them by price.

Write the TypeScript code for a component and the HTML template that implements this functionality. Your solution should:

1. Define a Product interface with properties: id, name, price, category, and imageUrl
2. Initialize an array of at least 5 product objects with different categories
3. Implement methods to:
   - Filter products by category
   - Sort products by price (ascending and descending)
4. Create the component's HTML template that:
   - Displays products in a grid layout
   - Includes category filter buttons
   - Includes sort options for price
   - Shows relevant product information for each item

**Note:** Your solution must use Angular binding syntax correctly and follow best practices for component design.
</question1>

<question2>
**Shopping Cart Service Implementation (15 points)**

Below is a partial implementation of a shopping cart service for an e-commerce application. Fill in the blanks (marked with /* FILL IN */) to complete the service implementation:

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Private BehaviorSubject to store cart items
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  
  // Public observable that components can subscribe to
  /* FILL IN LINE 1 */
  
  constructor() { }
  
  addToCart(product: any): void {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.productId === product.id);
    
    if (existingItem) {
      // Update quantity of existing item
      /* FILL IN LINE 2 */
    } else {
      // Add new item to cart
      currentItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }
    
    // Update the BehaviorSubject with the new array
    this.cartItems.next(currentItems);
  }
  
  // Other methods like removeFromCart, clearCart, etc. would be implemented here
}
```

The first blank should expose the cart items as an Observable for components to subscribe to, and the second blank should update the quantity of an existing item in the cart.
</question2>

<question3>
**Order Processing Component and Service Integration (25 points)**

Create a checkout component and order service that work together to process an e-commerce order. Your solution should include:

1. **Order Service (orderService.ts):**
   - Define an Order interface with properties: orderId, items (array of products), totalAmount, shippingAddress, and orderDate
   - Implement a method to submit an order to a backend (simulate this with a setTimeout that resolves a Promise)
   - Implement a method to validate an order before submission
   - Use appropriate Observable patterns

2. **Checkout Component (checkout.component.ts and checkout.component.html):**
   - Inject the OrderService
   - Create a form to collect shipping information
   - Display order summary (products, quantities, prices)
   - Implement order submission that uses the OrderService
   - Handle success and error states
   - Create the component's HTML template with appropriate form controls and validation messages

Your code should demonstrate proper dependency injection, form handling, and service integration following Angular best practices.
</question3>

<question4>
**Error Identification: Product Detail Component (15 points)**

The following product detail component has errors. Identify and explain what's wrong with this code and how to fix it:

```typescript
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  template: `
    <div class="product-detail" *ngIf="product">
      <h2>{{ product.name }}</h2>
      <p class="price">{{ product.price | currency }}</p>
      <div class="description">{{ product.description }}</div>
      <button (click)="addToCart(product)">Add to Cart</button>
    </div>
  `
})
export class ProductDetailComponent {
  product: any;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
      }
    );
  }
  
  addToCart(product) {
    this.productService.addProductToCart(product);
  }
}
```

Identify at least three errors or issues with this code and provide explanations and fixes for each.
</question4>

<question5>
**Error Identification: Product Rating Directive (10 points)**

The following code is for a custom directive that should display a star rating for products. Identify and explain what's wrong with this code and how to fix it:

```typescript
import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: 'productRating'
})
export class ProductRatingDirective {
  @Input() rating: number;
  
  constructor(private el: ElementRef) {}
  
  ngOnInit() {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      if (i < this.rating) {
        stars += '★';
      } else {
        stars += '☆';
      }
    }
    this.el.nativeElement.innerHTML = stars;
  }
  
  @HostListener('click')
  onClick() {
    // Allow user to update rating
    this.rating = this.rating < 5 ? this.rating + 1 : 1;
    this.ngOnInit();
  }
}
```

Identify at least three errors or issues with this code and provide explanations and fixes for each.
</question5>

<question6>
**Product Recommendation Service Implementation (15 points)**

Create a complete ProductRecommendationService for an e-commerce application that suggests products to users based on their browsing history and previous purchases.

Your service should:

1. Define appropriate interfaces for recommended products
2. Maintain a user's recently viewed products
3. Implement methods to:
   - Track when a user views a product
   - Generate personalized recommendations based on viewing history
   - Get recommendations related to a specific product
   - Clear viewing history

4. Use RxJS Observables to provide recommendation data to components
5. Include proper error handling
6. Implement a simple algorithm to rank recommendations based on view count and recency

Make sure your implementation includes proper TypeScript typing, follows Angular best practices, and includes appropriate comments to explain your logic.
</question6>
</exam>