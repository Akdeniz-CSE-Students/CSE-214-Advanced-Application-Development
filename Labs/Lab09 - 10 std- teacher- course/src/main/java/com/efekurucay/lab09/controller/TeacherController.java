package com.efekurucay.lab09.controller;

import com.efekurucay.lab09.model.Course;
import com.efekurucay.lab09.model.Student;
import com.efekurucay.lab09.model.Teacher;
import com.efekurucay.lab09.services.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    private final TeacherService teacherService;

    @Autowired
    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    // Öğretmen ile ilgili temel CRUD işlemleri
    
    @GetMapping
    public List<Teacher> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

    @GetMapping("/{id}")
    public Teacher getTeacherById(@PathVariable Long id) {
        return teacherService.getTeacherById(id);
    }

    @PostMapping
    public Teacher createTeacher(@RequestBody Teacher teacher) {
        return teacherService.createTeacher(teacher);
    }
    
    @PutMapping("/{id}")
    public Teacher updateTeacher(@PathVariable Long id, @RequestBody Teacher teacher) {
        return teacherService.updateTeacher(id, teacher);
    }

    @DeleteMapping("/{id}")
    public void deleteTeacher(@PathVariable Long id) {
        teacherService.deleteTeacher(id);
    }
    
    // Öğretmen-Öğrenci ve Öğretmen-Ders işlemleri
    
    // Öğretmene atanmış öğrencileri getir
    @GetMapping("/students")
    public List<Student> getAssignedStudents(@RequestParam Long teacherId) {
        return teacherService.getAssignedStudents(teacherId);
    }
    
    // Öğretmenin bekleyen ders taleplerini getir
    @GetMapping("/courses/pending")
    public List<Course> getPendingCourses(@RequestParam Long teacherId) {
        return teacherService.getPendingCourses(teacherId);
    }
    
    // Ders talebini onayla
    @PostMapping("/courses/approve/{courseId}")
    public Course approveCourse(@PathVariable Long courseId) {
        return teacherService.approveCourse(courseId);
    }
    
    // Ders talebini reddet
    @PostMapping("/courses/reject/{courseId}")
    public Course rejectCourse(@PathVariable Long courseId) {
        return teacherService.rejectCourse(courseId);
    }
}
