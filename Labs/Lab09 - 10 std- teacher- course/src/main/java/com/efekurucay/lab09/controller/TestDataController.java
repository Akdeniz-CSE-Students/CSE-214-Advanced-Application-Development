package com.efekurucay.lab09.controller;

import com.efekurucay.lab09.model.Course;
import com.efekurucay.lab09.model.Student;
import com.efekurucay.lab09.model.Teacher;
import com.efekurucay.lab09.model.User;
import com.efekurucay.lab09.repository.CourseRepository;
import com.efekurucay.lab09.repository.StudentRepository;
import com.efekurucay.lab09.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/test")
public class TestDataController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/add-data")
    public ResponseEntity<String> addTestData() {
        try {
            // Önce mevcut verileri temizle
            courseRepository.deleteAll();
            studentRepository.deleteAll();
            teacherRepository.deleteAll();

            // 1. Öğretmenleri ekle (şifre: 1234)
            Teacher teacher1 = new Teacher();
            teacher1.setUsername("teacher1");
            teacher1.setPassword(passwordEncoder.encode("1234"));
            teacher1.setRole(User.Role.TEACHER);
            teacher1.setName("Ahmet");
            teacher1.setSurname("Yılmaz");
            teacher1.setEmail("ahmet.yilmaz@university.edu");
            teacher1.setTeacherId("T001");
            teacher1.setDepartment("Bilgisayar Mühendisliği");
            teacher1 = teacherRepository.save(teacher1);

            Teacher teacher2 = new Teacher();
            teacher2.setUsername("teacher2");
            teacher2.setPassword(passwordEncoder.encode("1234"));
            teacher2.setRole(User.Role.TEACHER);
            teacher2.setName("Ayşe");
            teacher2.setSurname("Demir");
            teacher2.setEmail("ayse.demir@university.edu");
            teacher2.setTeacherId("T002");
            teacher2.setDepartment("Elektrik-Elektronik Mühendisliği");
            teacher2 = teacherRepository.save(teacher2);

            // 2. Öğrencileri ekle
            // Öğrenci 1 (şifre: S001)
            Student student1 = new Student();
            student1.setUsername("student1");
            student1.setPassword(passwordEncoder.encode("S001"));
            student1.setRole(User.Role.STUDENT);
            student1.setName("Mehmet");
            student1.setSurname("Kaya");
            student1.setEmail("mehmet.kaya@student.edu");
            student1.setStudentNumber("S001");
            student1.setRegistrationDate(LocalDate.of(2023, 9, 1));
            student1.setTeacher(teacher1);
            student1 = studentRepository.save(student1);

            // Öğrenci 2 (şifre: S002)
            Student student2 = new Student();
            student2.setUsername("student2");
            student2.setPassword(passwordEncoder.encode("S002"));
            student2.setRole(User.Role.STUDENT);
            student2.setName("Zeynep");
            student2.setSurname("Çelik");
            student2.setEmail("zeynep.celik@student.edu");
            student2.setStudentNumber("S002");
            student2.setRegistrationDate(LocalDate.of(2023, 9, 1));
            student2.setTeacher(teacher1);
            student2 = studentRepository.save(student2);

            // Öğrenci 3 (şifre: S003)
            Student student3 = new Student();
            student3.setUsername("student3");
            student3.setPassword(passwordEncoder.encode("S003"));
            student3.setRole(User.Role.STUDENT);
            student3.setName("Ali");
            student3.setSurname("Öztürk");
            student3.setEmail("ali.ozturk@student.edu");
            student3.setStudentNumber("S003");
            student3.setRegistrationDate(LocalDate.of(2023, 9, 1));
            student3.setTeacher(teacher2);
            student3 = studentRepository.save(student3);

            // 3. Kursları ekle
            // Kurs 1
            Course course1 = new Course();
            course1.setName("Java Programlama");
            course1.setCode("CSE101");
            course1.setDescription("Java programlama temel dersi");
            course1.setStatus(Course.CourseStatus.APPROVED);
            course1.setTeacher(teacher1);
            courseRepository.save(course1);

            // Kurs 2
            Course course2 = new Course();
            course2.setName("Web Geliştirme");
            course2.setCode("CSE102");
            course2.setDescription("HTML, CSS ve JavaScript ile web geliştirme");
            course2.setStatus(Course.CourseStatus.APPROVED);
            course2.setTeacher(teacher1);
            courseRepository.save(course2);

            // Kurs 3
            Course course3 = new Course();
            course3.setName("Veri Yapıları");
            course3.setCode("CSE201");
            course3.setDescription("Temel veri yapıları ve algoritmalar");
            course3.setStatus(Course.CourseStatus.PENDING);
            course3.setTeacher(teacher2);
            courseRepository.save(course3);

            // Kurs 4
            Course course4 = new Course();
            course4.setName("Veritabanı Sistemleri");
            course4.setCode("CSE301");
            course4.setDescription("SQL ve veritabanı yönetim sistemleri");
            course4.setStatus(Course.CourseStatus.PENDING);
            course4.setTeacher(teacher2);
            courseRepository.save(course4);

            return ResponseEntity.ok("Test verileri başarıyla eklendi!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Test verileri eklenirken hata oluştu: " + e.getMessage());
        }
    }
} 