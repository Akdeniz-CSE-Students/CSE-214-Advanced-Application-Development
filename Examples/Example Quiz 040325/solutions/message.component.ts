// Angular'ın temel modüllerinden gerekli bileşenleri import ediyoruz
// ViewChild: DOM elementlerine erişim için kullanılan dekoratör
// ElementRef: DOM elementi referansını tutan sınıf
// AfterViewInit ve AfterViewChecked: Görünüm ile ilgili yaşam döngüsü arayüzleri
import { Component, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';

// @Component dekoratörü ile bu sınıfın bir Angular bileşeni olduğunu belirtiyoruz
@Component({
  // HTML'de bu bileşeni çağırmak için kullanılacak selector
  selector: 'app-message',
  // Bileşenin görünümünü tanımlayan template
  template: `
    <div>
      <!-- #message template referansı ile bu elementi işaretliyoruz -->
      <!-- Bu referans sayesinde TypeScript kodunda bu elemente erişebileceğiz -->
      <p #message>Welcome to Angular!</p>
      <!-- Butona tıklandığında updateMessage metodunu çağırıyoruz -->
      <button (click)="updateMessage()">Update Message</button>
    </div>
  `
})
// MessageComponent sınıfını oluşturuyoruz ve görünüm yaşam döngüsü arayüzlerini implement ediyoruz
export class MessageComponent implements AfterViewInit, AfterViewChecked {
  // @ViewChild dekoratörü ile template'deki #message referanslı elementi yakalıyoruz
  // ElementRef tipinde bir değişkene atıyoruz
  // ! işareti ile bu değerin kesinlikle tanımlanacağını belirtiyoruz
  @ViewChild('message') messageElement!: ElementRef;
  
  // Mesaj güncelleme sayısını takip etmek için sayaç
  private updateCount: number = 0;

  // ngAfterViewInit: Görünüm (view) ilk kez oluşturulduğunda çalışır
  // Bu noktada DOM elementlerine güvenle erişebiliriz
  ngAfterViewInit() {
    console.log('Görünüm başlatıldı');
    // Görünüm başlatıldıktan sonra mesaj metnini değiştiriyoruz
    this.messageElement.nativeElement.textContent = 'Hello from AfterViewInit!';
  }

  // ngAfterViewChecked: Her görünüm güncellemesinden sonra çalışır
  // Görünümdeki değişiklikleri takip etmek için kullanılır
  ngAfterViewChecked() {
    console.log('Görünüm kontrol edildi - güncelleme sayısı:', this.updateCount);
  }

  // Butona tıklandığında çağrılan metod
  // Mesajı günceller ve sayacı artırır
  updateMessage() {
    this.updateCount++;
    this.messageElement.nativeElement.textContent = `Mesaj ${this.updateCount} kez güncellendi!`;
  }
}