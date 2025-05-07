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

## Yapılacak İşler
- [ ] Frontend: Angular ile kullanıcı arayüzü geliştirilecek
  - [ ] Login Page
  - [ ] Student Page
  - [ ] Teacher Page 