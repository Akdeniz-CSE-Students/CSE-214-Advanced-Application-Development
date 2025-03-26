import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = new BehaviorSubject<Product[]>([
    {
      id: 1,
      name: 'Product 1',
      description: 'Description for product 1',
      price: 29.99,
      image: 'https://via.placeholder.com/200'
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description for product 2',
      price: 39.99,
      image: 'https://via.placeholder.com/200'
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description for product 3',
      price: 49.99,
      image: 'https://via.placeholder.com/200'
    }
  ]);

  products$ = this.products.asObservable();

  constructor() {}

  addProduct(product: Product) {
    const currentProducts = this.products.getValue();
    this.products.next([...currentProducts, product]);
  }

  updateProduct(product: Product) {
    const currentProducts = this.products.getValue();
    const index = currentProducts.findIndex(p => p.id === product.id);
    if (index !== -1) {
      currentProducts[index] = product;
      this.products.next([...currentProducts]);
    }
  }

  deleteProduct(productId: number) {
    const currentProducts = this.products.getValue();
    this.products.next(currentProducts.filter(p => p.id !== productId));
  }
}
