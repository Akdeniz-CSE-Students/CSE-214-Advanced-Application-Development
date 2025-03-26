// Angular'ın temel modüllerinden gerekli bileşenleri import ediyoruz
// Component: Bileşen dekoratörü
// AfterContentInit: İçerik projeksiyonu sonrası yaşam döngüsü arayüzü
import { Component, AfterContentInit } from '@angular/core';

// @Component dekoratörü ile bu sınıfın bir Angular bileşeni olduğunu belirtiyoruz
@Component({
  // HTML'de bu bileşeni çağırmak için kullanılacak selector
  selector: 'app-card',
  // Bileşenin görünümünü tanımlayan template
  template: `
    <div class="card">
      <!-- Başlık için içerik projeksiyonu alanı -->
      <!-- card-title attribute'u ile seçilen içeriği buraya projekte ediyoruz -->
      <div class="card-header">
        <ng-content select="[card-title]"></ng-content>
      </div>
      <!-- Ana içerik için içerik projeksiyonu alanı -->
      <!-- card-content attribute'u ile seçilen içeriği buraya projekte ediyoruz -->
      <div class="card-body">
        <ng-content select="[card-content]"></ng-content>
      </div>
    </div>
  `,
  // Bileşenin stil tanımlamaları
  styles: [`
    .card {
      border: 1px solid #ddd;
      border-radius: 4px;
      margin: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .card-header {
      padding: 10px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #ddd;
    }
    .card-body {
      padding: 15px;
    }
  `]
})
// CardComponent sınıfını oluşturuyoruz ve AfterContentInit arayüzünü implement ediyoruz
// AfterContentInit: İçerik projeksiyonu tamamlandığında çalışacak yaşam döngüsü kancası
export class CardComponent implements AfterContentInit {
  // ngAfterContentInit: İçerik projeksiyonu tamamlandığında çalışır
  // Bu metod, projekte edilen içeriğin kullanılabilir olduğunu doğrular
  ngAfterContentInit() {
    console.log('Projekte edilen içerik başarıyla yüklendi ve kullanıma hazır');
  }
}