/**
 * TodoItem sınıfı, yapılacaklar listesindeki her bir görevi temsil eder.
 * Bu sınıf, görevlerin temel özelliklerini ve yapısını tanımlar.
 *
 * Özellikler:
 * - id: Her görevin benzersiz kimlik numarası. Bu numara ile görevleri birbirinden ayırt ederiz.
 *      Özellikle silme işlemlerinde bu ID'yi kullanacağız.
 *
 * - description: Görevin açıklaması. Kullanıcının girdiği görev metni burada saklanır.
 *      Örneğin: "Markete git", "Ödev yap" gibi.
 *
 * - completed: Görevin tamamlanma durumu. Boolean (true/false) değer tutar.
 *      - false: Görev henüz tamamlanmamış
 *      - true: Görev tamamlanmış
 *      Varsayılan olarak false değerini alır çünkü yeni eklenen görev tamamlanmamış olur.
 */
export class TodoItem {
    constructor(
        public id: number,
        public description: string,
        public completed: boolean = false
    ) {}
}
