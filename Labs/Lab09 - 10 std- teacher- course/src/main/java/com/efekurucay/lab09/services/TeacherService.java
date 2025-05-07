package com.efekurucay.lab09.services;

import com.efekurucay.lab09.model.Course;
import com.efekurucay.lab09.model.Student;
import com.efekurucay.lab09.model.Teacher;
import com.efekurucay.lab09.repository.CourseRepository;
import com.efekurucay.lab09.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherService {
    
    private final TeacherRepository teacherRepository;
    private final CourseRepository courseRepository;
    
    @Autowired
    public TeacherService(TeacherRepository teacherRepository, CourseRepository courseRepository) {
        this.teacherRepository = teacherRepository;
        this.courseRepository = courseRepository;
    }
    
    // Tüm öğretmenleri getir
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }
    
    // ID'ye göre öğretmen getir
    public Teacher getTeacherById(Long id) {
        return teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Öğretmen bulunamadı: " + id));
    }
    
    // Öğretmen ID'sine göre öğretmen getir
    public Teacher getTeacherByTeacherId(String teacherId) {
        return teacherRepository.findByTeacherId(teacherId)
                .orElseThrow(() -> new RuntimeException("Öğretmen ID'si ile öğretmen bulunamadı: " + teacherId));
    }
    
    // Kullanıcı adına göre öğretmen getir
    public Teacher getTeacherByUsername(String username) {
        return teacherRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Kullanıcı adı ile öğretmen bulunamadı: " + username));
    }
    
    // Yeni öğretmen oluştur
    public Teacher createTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }
    
    // Öğretmen bilgilerini güncelle
    public Teacher updateTeacher(Long id, Teacher teacherDetails) {
        Teacher teacher = getTeacherById(id);
        teacher.setName(teacherDetails.getName());
        teacher.setSurname(teacherDetails.getSurname());
        teacher.setEmail(teacherDetails.getEmail());
        teacher.setDepartment(teacherDetails.getDepartment());
        teacher.setTeacherId(teacherDetails.getTeacherId());
        return teacherRepository.save(teacher);
    }
    
    // Öğretmeni sil
    public void deleteTeacher(Long id) {
        teacherRepository.deleteById(id);
    }
    
    // Öğretmene atanmış öğrencileri getir
    public List<Student> getAssignedStudents(Long teacherId) {
        Teacher teacher = getTeacherById(teacherId);
        return teacher.getStudents();
    }
    
    // Öğretmenin onay bekleyen tüm dersleri
    public List<Course> getPendingCourses(Long teacherId) {
        Teacher teacher = getTeacherById(teacherId);
        return teacher.getCourses().stream()
                .filter(course -> Course.CourseStatus.PENDING.equals(course.getStatus()))
                .collect(Collectors.toList());
    }
    
    // Dersi onayla
    public Course approveCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Ders bulunamadı: " + courseId));
        course.setStatus(Course.CourseStatus.APPROVED);
        return courseRepository.save(course);
    }
    
    // Dersi reddet
    public Course rejectCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Ders bulunamadı: " + courseId));
        course.setStatus(Course.CourseStatus.REJECTED);
        return courseRepository.save(course);
    }
}
