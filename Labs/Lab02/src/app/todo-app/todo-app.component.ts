/**
 * Angular'da gerekli modülleri import ediyoruz:
 * - Component: Angular'ın temel yapı taşı olan component dekoratörü
 * - TodoItem: Görev modelimiz
 * - FormsModule: İki yönlü veri bağlama ([(ngModel)]) için gerekli
 * - CommonModule: Angular'ın yaygın direktifleri (*ngFor, *ngIf gibi) için gerekli
 */
import { Component } from '@angular/core';
import { TodoItem } from './todo-item.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @Component dekoratörü ile bu sınıfın bir Angular componenti olduğunu belirtiyoruz.
 *
 * Özellikler:
 * - selector: HTML'de bu componenti çağırmak için kullanacağımız etiket adı
 * - templateUrl: Componentin HTML şablonunun yolu
 * - styleUrls: Componentin CSS stil dosyalarının yolu
 * - standalone: Bu component'in bağımsız olduğunu belirtir (Angular 14+ özelliği)
 * - imports: Bu component'in kullandığı Angular modülleri
 */
@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class TodoAppComponent {
  /**
   * Component'in veri yapıları ve özellikleri:
   *
   * todos: TodoItem tipinde bir dizi. Tüm görevleri içerir.
   * - Başlangıçta boş bir dizi olarak tanımlanır
   * - Her yeni görev bu diziye eklenir
   * - Silinen görevler bu diziden çıkarılır
   */
  todos: TodoItem[] = [];

  /**
   * newTodoText: Yeni görev eklemek için kullanılan input alanının değeri
   * - Başlangıçta boş string
   * - [(ngModel)] ile input alanına bağlanır
   * - Her yeni görev eklendikten sonra temizlenir
   */
  newTodoText: string = '';

  /**
   * addTodo(): Yeni görev ekleme fonksiyonu
   *
   * İşleyiş:
   * 1. Girilen metnin boş olup olmadığını kontrol eder (trim() ile başındaki ve sonundaki boşlukları temizler)
   * 2. Eğer metin boş değilse:
   *    - Yeni bir TodoItem nesnesi oluşturur
   *    - ID olarak mevcut görev sayısının bir fazlasını kullanır
   *    - Görevi todos dizisine ekler
   *    - Input alanını temizler
   *
   * Not: Bu fonksiyon hem "Ekle" butonuna tıklandığında hem de
   * input alanında Enter tuşuna basıldığında çalışır.
   */
  addTodo() {
    if (this.newTodoText.trim() !== '') {
      const newTodo = new TodoItem(
        this.todos.length + 1,
        this.newTodoText.trim()
      );
      this.todos.push(newTodo);
      this.newTodoText = '';
    }
  }

  /**
   * toggleTodo(): Görev durumunu değiştirme fonksiyonu
   *
   * @param todo - Durumu değiştirilecek görev
   *
   * İşleyiş:
   * - Parametre olarak gelen görevin completed özelliğini tersine çevirir
   * - true ise false yapar, false ise true yapar
   * - Bu sayede görev tamamlandı/tamamlanmadı durumu değişir
   * - HTML'de checkbox'ın durumu ve metnin üstü çizili stili bu değere göre güncellenir
   */
  toggleTodo(todo: TodoItem) {
    todo.completed = !todo.completed;
  }

  /**
   * deleteTodo(): Görev silme fonksiyonu
   *
   * @param id - Silinecek görevin ID'si
   *
   * İşleyiş:
   * - filter() metodu ile verilen ID'ye sahip olmayan görevleri yeni bir diziye alır
   * - Bu sayede verilen ID'ye sahip görev diziden çıkarılmış olur
   * - todos dizisini bu yeni filtrelenmiş dizi ile günceller
   *
   * Örnek:
   * Eğer todos = [{id: 1, ...}, {id: 2, ...}, {id: 3, ...}] ve id = 2 ise
   * Sonuç: todos = [{id: 1, ...}, {id: 3, ...}] olur
   */
  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
