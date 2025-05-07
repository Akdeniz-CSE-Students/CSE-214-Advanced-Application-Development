# Proje İlerleme Takibi

## Tamamlanan İşler
- [x] User base sınıfı oluşturuldu, Student ve Teacher sınıfları User'dan extend edildi
- [x] Student sınıfında teacher ile ilişki kuruldu
- [x] Course sınıfına status alanı ve enum eklendi
- [x] Service katmanı: StudentService, TeacherService, CourseService sınıfları geliştirildi
- [x] Repository katmanı: Custom sorgular eklendi (findByUsername, findByStudentNumber, findByTeacherId, findByStatus, findByTeacher)
- [x] Controller katmanı: API endpointleri güncellendi ve gerekli roller ile yolları belirlendi 
- [x] Spring Security: JWT tabanlı kimlik doğrulama ve yetkilendirme eklendi
- [x] ErrorHandling: Merkezi hata yönetimi için @RestControllerAdvice oluşturuldu
- [x] Frontend: Angular ile kullanıcı arayüzü geliştirildi
  - [x] Login Page: Öğrenci/Öğretmen girişi için form geliştirildi
  - [x] Student Page: Dashboard, tüm dersler, bekleyen dersler ve onaylanan dersler sekmeleri eklendi
  - [x] Teacher Page: Dashboard, atanmış öğrenciler ve bekleyen ders talepleri sekmeleri eklendi

## Yapılacak İşler
- [ ] Birim testleri eklenmesi: Controller, Service ve Repository katmanları için
- [ ] Dokümantasyon: API belgelendirmesi için Swagger UI entegrasyonu
- [ ] Performans optimizasyonları: Sayfalama, önbellek vb. 