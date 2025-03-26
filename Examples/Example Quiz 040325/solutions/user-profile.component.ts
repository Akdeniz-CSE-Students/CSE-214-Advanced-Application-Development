// Angular'ın temel modüllerinden gerekli bileşenleri import ediyoruz
// Component: Bileşen dekoratörü
// AfterContentChecked: İçerik değişikliklerini kontrol eden yaşam döngüsü arayüzü
import { Component, AfterContentChecked } from '@angular/core';

// @Component dekoratörü ile bu sınıfın bir Angular bileşeni olduğunu belirtiyoruz
@Component({
  // HTML'de bu bileşeni çağırmak için kullanılacak selector
  selector: 'app-user-profile',
  // Bileşenin görünümünü tanımlayan template
  template: `
    <div class="profile-card">
      <!-- ng-content ile dışarıdan gelen içeriği projekte ediyoruz -->
      <!-- Bu alan parent component'ten gelen içeriği gösterecek -->
      <ng-content></ng-content>
    </div>
  `,
  // Bileşenin stil tanımlamaları
  styles: [`
    .profile-card {
      border: 1px solid #eee;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin: 10px;
    }
  `]
})
// UserProfileComponent sınıfını oluşturuyoruz ve AfterContentChecked arayüzünü implement ediyoruz
export class UserProfileComponent implements AfterContentChecked {
  // İçerik kontrolü sayısını takip etmek için sayaç
  private contentCheckCount: number = 0;

  // ngAfterContentChecked: Her içerik değişikliği kontrolünden sonra çalışır
  // Bu metod, projekte edilen içerikteki değişiklikleri takip etmemizi sağlar
  ngAfterContentChecked() {
    this.contentCheckCount++;
    console.log(`İçerik ${this.contentCheckCount} kez kontrol edildi`);
    console.log('Projekte edilen içerikte değişiklik olmuş olabilir');
  }
}