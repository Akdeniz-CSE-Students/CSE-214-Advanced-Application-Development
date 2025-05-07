package com.efekurucay.lab09.controller;

import com.efekurucay.lab09.model.Course;
import com.efekurucay.lab09.model.Course.CourseStatus;
import com.efekurucay.lab09.model.Student;
import com.efekurucay.lab09.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    // Tüm dersleri getir
    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    // ID'ye göre ders getir
    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id);
    }

    // Yeni ders oluştur
    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return courseService.createCourse(course);
    }
    
    // Ders güncelle
    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody Course course) {
        return courseService.updateCourse(id, course);
    }

    // Dersi sil
    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
    }
    
    // Statüye göre dersleri getir
    @GetMapping("/status/{status}")
    public List<Course> getCoursesByStatus(@PathVariable CourseStatus status) {
        return courseService.getCoursesByStatus(status);
    }
    
    // Öğretmene göre dersleri getir
    @GetMapping("/teacher/{teacherId}")
    public List<Course> getCoursesByTeacher(@PathVariable Long teacherId) {
        return courseService.getCoursesByTeacher(teacherId);
    }
    
    // Derse kayıtlı öğrencileri getir
    @GetMapping("/{id}/students")
    public List<Student> getStudentsByCourse(@PathVariable Long id) {
        return courseService.getStudentsByCourse(id);
    }
    
    // Derse öğrenci ekle
    @PostMapping("/{courseId}/students/{studentId}")
    public Course addStudentToCourse(@PathVariable Long courseId, @PathVariable Long studentId) {
        return courseService.addStudentToCourse(courseId, studentId);
    }
    
    // Dersten öğrenciyi çıkar
    @DeleteMapping("/{courseId}/students/{studentId}")
    public Course removeStudentFromCourse(@PathVariable Long courseId, @PathVariable Long studentId) {
        return courseService.removeStudentFromCourse(courseId, studentId);
    }
    
    // Ders durumunu güncelle
    @PutMapping("/{id}/status/{status}")
    public Course updateCourseStatus(@PathVariable Long id, @PathVariable CourseStatus status) {
        return courseService.updateCourseStatus(id, status);
    }
}
