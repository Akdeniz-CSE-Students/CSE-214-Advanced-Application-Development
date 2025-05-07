-- Veritabanını oluştur (zaten varsa yorumu kaldırabilirsiniz)
-- CREATE DATABASE lab09;
-- USE lab09;

-- Tabloları temizle (test için)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE course;
TRUNCATE TABLE student;
TRUNCATE TABLE teacher;
TRUNCATE TABLE users;
TRUNCATE TABLE student_course;
SET FOREIGN_KEY_CHECKS = 1;

-- Users tablosuna veri ekle - öğretmenler için şifre: "1234", öğrenciler için şifre: kendi öğrenci numaraları
INSERT INTO users (id, username, password, role, name, surname, email) VALUES 
-- teacher1 şifresi: 1234
(1, 'teacher1', '$2a$10$ziLo1843QGkcAd4F7rBk9.h.vk4A1fAcbR6PBxcXS5KGRxRxGUb/O', 'TEACHER', 'Ahmet', 'Yılmaz', 'ahmet.yilmaz@university.edu'),
-- teacher2 şifresi: 1234
(2, 'teacher2', '$2a$10$ziLo1843QGkcAd4F7rBk9.h.vk4A1fAcbR6PBxcXS5KGRxRxGUb/O', 'TEACHER', 'Ayşe', 'Demir', 'ayse.demir@university.edu'),
-- student1 şifresi: S001
(3, 'student1', '$2a$10$p63jy0tsZQ5/Jinn0R6g0.Z4ziUF9hVhAwYikyeVm0uM4Ap.nJSe.', 'STUDENT', 'Mehmet', 'Kaya', 'mehmet.kaya@student.edu'),
-- student2 şifresi: S002
(4, 'student2', '$2a$10$MQjLU5X2UHmR6a85LuUw4OWxu7Dh1E8tNuFnT5zyX0WC6S2K5Qe1q', 'STUDENT', 'Zeynep', 'Çelik', 'zeynep.celik@student.edu'),
-- student3 şifresi: S003
(5, 'student3', '$2a$10$oBHqLXWYLBTgj5S1.YZJnugd2TpYtqRDQILEoq3pXw7/zUC/WOFRC', 'STUDENT', 'Ali', 'Öztürk', 'ali.ozturk@student.edu');

-- Teacher tablosuna veri ekle
INSERT INTO teacher (id, teacher_id, department) VALUES 
(1, 'T001', 'Bilgisayar Mühendisliği'),
(2, 'T002', 'Elektrik-Elektronik Mühendisliği');

-- Student tablosuna veri ekle
INSERT INTO student (id, student_number, registration_date, teacher_id) VALUES 
(3, 'S001', '2023-09-01', 1),
(4, 'S002', '2023-09-01', 1),
(5, 'S003', '2023-09-01', 2);

-- Course tablosuna veri ekle
INSERT INTO course (id, name, code, description, status, teacher_id) VALUES 
(1, 'Java Programlama', 'CSE101', 'Java programlama temel dersi', 'APPROVED', 1),
(2, 'Web Geliştirme', 'CSE102', 'HTML, CSS ve JavaScript ile web geliştirme', 'APPROVED', 1),
(3, 'Veri Yapıları', 'CSE201', 'Temel veri yapıları ve algoritmalar', 'PENDING', 2),
(4, 'Veritabanı Sistemleri', 'CSE301', 'SQL ve veritabanı yönetim sistemleri', 'PENDING', 2);

-- Student-Course ilişkilerini ekle
INSERT INTO student_course (student_id, course_id) VALUES 
(3, 1), 
(3, 2),
(4, 1),
(5, 3); 