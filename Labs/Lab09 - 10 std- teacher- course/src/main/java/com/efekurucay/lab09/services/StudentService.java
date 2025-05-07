package com.efekurucay.lab09.services;

import com.efekurucay.lab09.model.Course;
import com.efekurucay.lab09.model.Student;
import com.efekurucay.lab09.repository.CourseRepository;
import com.efekurucay.lab09.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {
    
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    
    @Autowired
    public StudentService(StudentRepository studentRepository, CourseRepository courseRepository) {
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }
    
    // Tüm öğrencileri getir
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    // ID'ye göre öğrenci getir
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Öğrenci bulunamadı: " + id));
    }
    
    // Öğrenci numarasına göre öğrenci getir
    public Student getStudentByNumber(String studentNumber) {
        return studentRepository.findByStudentNumber(studentNumber)
                .orElseThrow(() -> new RuntimeException("Öğrenci numarası ile öğrenci bulunamadı: " + studentNumber));
    }
    
    // Yeni öğrenci oluştur
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }
    
    // Öğrenciyi güncelle
    public Student updateStudent(Long id, Student studentDetails) {
        Student student = getStudentById(id);
        student.setName(studentDetails.getName());
        student.setSurname(studentDetails.getSurname());
        student.setEmail(studentDetails.getEmail());
        student.setStudentNumber(studentDetails.getStudentNumber());
        student.setTeacher(studentDetails.getTeacher());
        return studentRepository.save(student);
    }
    
    // Öğrenciyi sil
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
    
    // Bir öğrencinin tüm derslerini getir
    public List<Course> getStudentCourses(Long studentId) {
        Student student = getStudentById(studentId);
        return student.getCourses();
    }
    
    // Öğrencinin bekleyen derslerini getir
    public List<Course> getPendingCourses(Long studentId) {
        Student student = getStudentById(studentId);
        return student.getCourses().stream()
                .filter(course -> Course.CourseStatus.PENDING.equals(course.getStatus()))
                .collect(Collectors.toList());
    }
    
    // Öğrencinin onaylanmış derslerini getir
    public List<Course> getApprovedCourses(Long studentId) {
        Student student = getStudentById(studentId);
        return student.getCourses().stream()
                .filter(course -> Course.CourseStatus.APPROVED.equals(course.getStatus()))
                .collect(Collectors.toList());
    }
    
    // Öğrenciye ders ekle (default olarak PENDING durumunda)
    public Course addCourseToStudent(Long studentId, Course course) {
        Student student = getStudentById(studentId);
        course.setStatus(Course.CourseStatus.PENDING);
        Course savedCourse = courseRepository.save(course);
        
        List<Course> courses = student.getCourses();
        courses.add(savedCourse);
        student.setCourses(courses);
        studentRepository.save(student);
        
        return savedCourse;
    }
    
    // Mevcut bir derse kayıt ol
    public Course enrollCourse(Long studentId, Long courseId) {
        Student student = getStudentById(studentId);
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Ders bulunamadı: " + courseId));
        
        // Öğrencinin zaten bu derse kayıtlı olup olmadığını kontrol et
        if (student.getCourses().contains(course)) {
            throw new RuntimeException("Öğrenci zaten bu derse kayıtlı: " + course.getName());
        }
        
        // Dersi PENDING durumunda ekle
        course.setStatus(Course.CourseStatus.PENDING);
        
        // Öğrenci-ders ilişkisini güncelle
        List<Course> courses = student.getCourses();
        courses.add(course);
        student.setCourses(courses);
        studentRepository.save(student);
        
        return course;
    }
}
