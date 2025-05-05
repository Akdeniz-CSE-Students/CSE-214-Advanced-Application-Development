package com.efekurucay.lab09.controller;

import com.efekurucay.lab09.model.Student;
import com.efekurucay.lab09.repository.StudentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {
    private final StudentRepository studentRepository; 
    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }
    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentRepository.deleteById(id);
    }
}
