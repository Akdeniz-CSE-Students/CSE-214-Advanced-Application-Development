// Angular'ın temel modüllerinden gerekli bileşenleri import ediyoruz
// Component: Bileşen dekoratörü
// DoCheck: Değişiklik algılama için kullanılan yaşam döngüsü arayüzü
// AfterViewChecked: Görünüm güncellemelerini kontrol eden yaşam döngüsü arayüzü
import { Component, DoCheck, AfterViewChecked } from '@angular/core';

// Ürün verisi için bir interface tanımlıyoruz
interface Product {
  id: number;      // Ürün benzersiz kimliği
  name: string;    // Ürün adı
  price: number;   // Ürün fiyatı
}

// @Component dekoratörü ile bu sınıfın bir Angular bileşeni olduğunu belirtiyoruz
@Component({
  selector: 'app-cart',
  template: `
    <div class="cart-container">
      <h2>Alışveriş Sepeti</h2>
      <!-- Ürünleri listeleyen bölüm -->
      <div class="products">
        <!-- *ngFor ile her ürün için bir div oluşturuyoruz -->
        <div *ngFor="let product of cart.products" class="product-item">
          {{ product.name }} - {{ product.price }}₺
        </div>
      </div>
      <!-- Toplam fiyatı gösteren bölüm -->
      <!-- #totalPrice referansı ile bu elementi işaretliyoruz -->
      <div class="total" #totalPrice>
        Toplam: {{ cart.total }}₺
      </div>
      <!-- Örnek ürün ekleme butonu -->
      <button (click)="addProduct()">Örnek Ürün Ekle</button>
    </div>
  `,
  styles: [`
    .cart-container {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      max-width: 400px;
      margin: 20px auto;
    }
    .product-item {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .total {
      margin-top: 20px;
      font-weight: bold;
      font-size: 1.2em;
    }
  `]
})
// CartComponent sınıfını oluşturuyoruz ve yaşam döngüsü arayüzlerini implement ediyoruz
export class CartComponent implements DoCheck, AfterViewChecked {
  // Sepet verilerini tutan nesne
  cart = {
    products: [] as Product[],  // Ürünler dizisi
    total: 0                    // Toplam fiyat
  };

  // Değişiklikleri takip etmek için önceki değerleri saklıyoruz
  private lastProductCount = 0;  // Son ürün sayısı
  private lastTotal = 0;         // Son toplam fiyat

  // Yeni ürün ekleme metodu
  addProduct() {
    // Yeni bir ürün oluşturuyoruz
    const newProduct: Product = {
      id: this.cart.products.length + 1,
      name: `Ürün ${this.cart.products.length + 1}`,
      price: Math.floor(Math.random() * 100) + 1  // 1-100 arası rastgele fiyat
    };
    
    // Ürünü sepete ekliyoruz
    this.cart.products.push(newProduct);
    // Toplam fiyatı güncelliyoruz
    this.updateTotal();
  }

  // Toplam fiyatı hesaplayan özel metod
  private updateTotal() {
    // reduce ile tüm ürünlerin fiyatlarını topluyoruz
    this.cart.total = this.cart.products.reduce((sum, product) => sum + product.price, 0);
  }

  // ngDoCheck: Her değişiklik algılama döngüsünde çalışır
  // Sepetteki ürün sayısındaki değişiklikleri kontrol ediyoruz
  ngDoCheck() {
    if (this.lastProductCount !== this.cart.products.length) {
      console.log('Sepet ürünleri değişti - Mevcut ürün sayısı:', this.cart.products.length);
      this.lastProductCount = this.cart.products.length;
    }
  }

  // ngAfterViewChecked: Her görünüm güncellemesinden sonra çalışır
  // Toplam fiyattaki değişiklikleri kontrol ediyoruz
  ngAfterViewChecked() {
    if (this.lastTotal !== this.cart.total) {
      console.log('Toplam fiyat güncellendi:', this.cart.total);
      this.lastTotal = this.cart.total;
    }
  }
}