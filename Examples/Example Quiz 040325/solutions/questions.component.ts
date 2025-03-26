import { Component } from '@angular/core';

@Component({
  selector: 'app-questions',
  template: `
    <div class="questions-container">
      <mat-card *ngFor="let question of questions" class="question-card">
        <mat-card-header>
          <mat-card-title>{{ question.title }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p [innerHTML]="question.description"></p>
          <ul>
            <li *ngFor="let task of question.tasks">{{ task }}</li>
          </ul>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .questions-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .question-card {
      margin-bottom: 20px;
    }
    mat-card-content {
      margin-top: 16px;
    }
    ul {
      padding-left: 20px;
    }
  `]
})
export class QuestionsComponent {
  questions = [
    {
      title: 'Soru 1: Kullanıcı Bileşeni Değişiklikleri',
      description: 'Bir ebeveyn bileşenden kullanıcı nesnesi alan ve kullanıcının adını görüntüleyen bir Angular bileşeni oluşturuyorsunuz. Ancak, ebeveyn bileşen nesne referansını değiştirmeden kullanıcının adını güncelliyor.',
      tasks: [
        'ngOnChanges() ve ngDoCheck() kullanarak kullanıcı nesnesindeki değişiklikleri algılayan bir UserComponent oluşturun.',
        'Her yaşam döngüsü kancasındaki değişiklikleri günlüğe kaydedin.',
        'ngOnChanges() bazı güncellemeleri neden algılamazken, ngDoCheck() algıladığını açıklayın.'
      ]
    },
    {
      title: 'Soru 2: İçerik Projeksiyonu',
      description: 'Kullanıcıların <ng-content> kullanarak içeriği içine yerleştirebileceği bir CardComponent oluşturmanız isteniyor.',
      tasks: [
        'Dinamik başlık ve içeriğe izin vermek için içerik projeksiyonu kullanan bir CardComponent oluşturun.',
        'Projekte edilen içeriğin ne zaman kullanılabilir olduğunu günlüğe kaydetmek için ngAfterContentInit() kullanın.',
        'AppComponent içinde CardComponent içine farklı içerikler gönderin.'
      ]
    },
    {
      title: 'Soru 3: ViewChild Örneği',
      description: 'Bir alt öğe içeren bir bileşeniniz var: <p #message>Welcome to Angular!</p>',
      tasks: [
        'ngAfterViewInit() içinde bu öğeye erişmek için @ViewChild() kullanın.',
        'ngAfterViewInit() içinde metni değiştirin ve daha sonraki güncellemeleri izlemek için neden ngAfterViewChecked() gerektiğini açıklayın.'
      ]
    },
    {
      title: 'Soru 4: Kullanıcı Profili İçerik Değişiklikleri',
      description: '<ng-content> içinde projekte edilen içeriği kabul eden bir UserProfileComponent oluşturuyorsunuz.',
      tasks: [
        'Projekte edilen içerik her değiştiğinde günlüğe kaydetmek için ngAfterContentChecked() kullanın.',
        'AppComponent içinde, bir düğme tıklamasıyla projekte edilen içeriği dinamik olarak değiştirin.'
      ]
    },
    {
      title: 'Soru 5: Sepet Güncellemeleri',
      description: 'Seçilen ürünlerin bir listesini tutan bir CartComponent var.',
      tasks: [
        'Sepete yeni bir ürün ekleyen ve toplam fiyatı güncelleyen bir metod uygulayın.',
        'Sepet nesnesindeki derin değişiklikleri algılamak için ngDoCheck() kullanın.',
        'Görüntülenen toplam fiyattaki değişiklikleri algılamak için ngAfterViewChecked() kullanın.'
      ]
    }
  ];
}