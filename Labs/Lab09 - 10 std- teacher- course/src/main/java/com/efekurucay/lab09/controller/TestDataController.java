package com.efekurucay.lab09.controller;

import com.efekurucay.lab09.model.Course;
import com.efekurucay.lab09.model.Student;
import com.efekurucay.lab09.model.Teacher;
import com.efekurucay.lab09.model.User;
import com.efekurucay.lab09.repository.CourseRepository;
import com.efekurucay.lab09.repository.StudentRepository;
import com.efekurucay.lab09.repository.TeacherRepository;
import com.efekurucay.lab09.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> checkStatus() {
        Map<String, Object> status = new HashMap<>();
        
        List<User> users = userRepository.findAll();
        List<Student> students = studentRepository.findAll();
        List<Teacher> teachers = teacherRepository.findAll();
        List<Course> courses = courseRepository.findAll();
        
        status.put("totalUsers", users.size());
        status.put("totalStudents", students.size());
        status.put("totalTeachers", teachers.size());
        status.put("totalCourses", courses.size());
        
        status.put("users", users);
        status.put("students", students);
        status.put("teachers", teachers);
        
        return ResponseEntity.ok(status);
    }
    
    @PostMapping("/add-test-user")
    @Transactional
    public ResponseEntity<Map<String, Object>> addTestUser() {
        // Önce kullanıcıların var olup olmadığını kontrol et
        Optional<Teacher> existingTeacher = teacherRepository.findByUsername("test_teacher");
        Optional<Student> existingStudent = studentRepository.findByUsername("test_student");
        
        Teacher teacher;
        if (existingTeacher.isPresent()) {
            teacher = existingTeacher.get();
            System.out.println("Test öğretmen zaten mevcut: " + teacher.getUsername());
        } else {
            teacher = new Teacher();
            teacher.setUsername("test_teacher");
            teacher.setPassword(passwordEncoder.encode("1234"));
            teacher.setName("Test");
            teacher.setSurname("Teacher");
            teacher.setEmail("test.teacher@example.com");
            teacher.setRole(User.Role.TEACHER);
            teacher.setTeacherId("T999");
            teacher.setDepartment("Test Department");
            
            teacher = teacherRepository.save(teacher);
            System.out.println("Test öğretmen oluşturuldu: " + teacher.getUsername());
        }
        
        Student student;
        if (existingStudent.isPresent()) {
            student = existingStudent.get();
            System.out.println("Test öğrenci zaten mevcut: " + student.getUsername());
        } else {
            student = new Student();
            student.setUsername("test_student");
            student.setPassword(passwordEncoder.encode("S999"));
            student.setName("Test");
            student.setSurname("Student");
            student.setEmail("test.student@example.com");
            student.setRole(User.Role.STUDENT);
            student.setStudentNumber("S999");
            student.setRegistrationDate(LocalDate.now());
            student.setTeacher(teacher);
            
            student = studentRepository.save(student);
            System.out.println("Test öğrenci oluşturuldu: " + student.getUsername());
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Test kullanıcıları hazır");
        response.put("teacher", teacher);
        response.put("student", student);
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    @Transactional
    public ResponseEntity<?> addTestData() {
        try {
            // Veri var mı kontrol et
            if (teacherRepository.count() > 0 || studentRepository.count() > 0 || courseRepository.count() > 0) {
                System.out.println("Veritabanında zaten kayıtlar var. Yeni kayıt eklenmedi.");
                return ResponseEntity.ok("Veritabanı mevcut kayıtları korundu, yeni kayıt eklenmedi.");
            }
            
            System.out.println("Veritabanı boş, test verileri yükleniyor...");
            
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