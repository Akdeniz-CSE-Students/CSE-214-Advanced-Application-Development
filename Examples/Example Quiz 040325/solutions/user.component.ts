// Angular'ın temel modüllerinden gerekli bileşenleri import ediyoruz
// Component: Bileşen dekoratörü
// Input: Parent'tan veri almak için kullanılan dekoratör
// OnChanges ve DoCheck: Yaşam döngüsü arayüzleri
// SimpleChanges: Değişiklikleri takip etmek için kullanılan interface
import { Component, Input, OnChanges, DoCheck, SimpleChanges } from '@angular/core';

// Kullanıcı verisi için bir interface tanımlıyoruz
// Bu interface, kullanıcının sahip olması gereken özellikleri belirler
interface User {
  name: string; // Kullanıcının adını tutacak string tipinde değişken
}

// @Component dekoratörü ile bu sınıfın bir Angular bileşeni olduğunu belirtiyoruz
@Component({
  // HTML'de bu bileşeni çağırmak için kullanılacak selector
  selector: 'app-user',
  // Bileşenin görünümünü tanımlayan template
  template: `
    <div>
      <h2>User Component</h2>
      <!-- Interpolation ile user nesnesinin name özelliğini görüntülüyoruz -->
      <p>User Name: {{ user.name }}</p>
    </div>
  `
})
// UserComponent sınıfını oluşturuyoruz ve iki yaşam döngüsü arayüzünü implement ediyoruz
// OnChanges: Input property'lerdeki değişiklikleri yakalar
// DoCheck: Her değişiklik algılama döngüsünde çalışır
export class UserComponent implements OnChanges, DoCheck {
  // Parent component'ten user verisini alıyoruz
  // ! işareti ile bu değerin kesinlikle tanımlanacağını belirtiyoruz
  @Input() user!: User;
  
  // Kullanıcı adındaki değişiklikleri takip etmek için önceki adı saklıyoruz
  private previousName: string = '';

  // ngOnChanges: Input property'lerde referans değişikliği olduğunda çalışır
  // Yani user objesi tamamen değiştiğinde tetiklenir
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called');
    // User property'sinde bir değişiklik varsa
    if (changes['user']) {
      // Değişiklik öncesi ve sonrası değerleri logluyoruz
      console.log('Previous value:', changes['user'].previousValue);
      console.log('Current value:', changes['user'].currentValue);
    }
  }

  // ngDoCheck: Her değişiklik algılama döngüsünde çalışır
  // Bu sayede object içindeki property değişikliklerini de yakalayabiliriz
  ngDoCheck() {
    console.log('ngDoCheck called');
    // Kullanıcı adı değiştiğinde bunu tespit ediyoruz
    if (this.user && this.user.name !== this.previousName) {
      // Değişikliği logluyoruz
      console.log('Name changed from', this.previousName, 'to', this.user.name);
      // Yeni adı saklıyoruz
      this.previousName = this.user.name;
    }
  }
}