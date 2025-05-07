package com.efekurucay.lab09.controller;

import com.efekurucay.lab09.model.Course;
import com.efekurucay.lab09.model.Student;
import com.efekurucay.lab09.services.CourseService;
import com.efekurucay.lab09.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    private final StudentService studentService;
    private final CourseService courseService;
    
    @Autowired
    public StudentController(StudentService studentService, CourseService courseService) {
        this.studentService = studentService;
        this.courseService = courseService;
    }
    
    // Öğrenci ile ilgili temel CRUD işlemleri
    
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }
    
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }
    
    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.createStudent(student);
    }
    
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }
    
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }
    
    // Öğrenci-Ders ile ilgili işlemler
    
    // Tüm mevcut dersleri getir
    @GetMapping("/courses/all")
    public List<Course> getAllCourses(@RequestParam(required = false) Long studentId) {
        if (studentId != null) {
            return studentService.getStudentCourses(studentId);
        }
        throw new RuntimeException("Öğrenci ID'si gereklidir");
    }
    
    // Kaydolunabilecek tüm dersleri getir
    @GetMapping("/courses/available")
    public List<Course> getAvailableCourses() {
        // Kaydolunabilecek tüm dersleri getir
        // Burada tüm dersleri döndürüyoruz, gerçek uygulamada filtreleme yapılabilir
        return courseService.getAllCourses();
    }
    
    // Bekleyen dersleri getir
    @GetMapping("/courses/pending")
    public List<Course> getPendingCourses(@RequestParam Long studentId) {
        return studentService.getPendingCourses(studentId);
    }
    
    // Onaylanmış dersleri getir
    @GetMapping("/courses/approved")
    public List<Course> getApprovedCourses(@RequestParam Long studentId) {
        return studentService.getApprovedCourses(studentId);
    }
    
    // Yeni ders ekle (PENDING durumunda)
    @PostMapping("/courses/add")
    public Course addCourse(@RequestParam Long studentId, @RequestBody Course course) {
        return studentService.addCourseToStudent(studentId, course);
    }
    
    // Mevcut bir derse kayıt ol
    @PostMapping("/courses/enroll")
    public Course enrollCourse(@RequestBody Map<String, Long> requestMap) {
        Long studentId = requestMap.get("studentId");
        Long courseId = requestMap.get("courseId");
        
        if (studentId == null || courseId == null) {
            throw new RuntimeException("Öğrenci ID ve Kurs ID zorunludur");
        }
        
        return studentService.enrollCourse(studentId, courseId);
    }
}


