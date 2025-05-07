package com.efekurucay.lab09.services;

import com.efekurucay.lab09.model.Course;
import com.efekurucay.lab09.model.Course.CourseStatus;
import com.efekurucay.lab09.model.Student;
import com.efekurucay.lab09.model.Teacher;
import com.efekurucay.lab09.repository.CourseRepository;
import com.efekurucay.lab09.repository.StudentRepository;
import com.efekurucay.lab09.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {
    
    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    
    @Autowired
    public CourseService(CourseRepository courseRepository, 
                        StudentRepository studentRepository,
                        TeacherRepository teacherRepository) {
        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
    }
    
    // Tüm dersleri getir
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    
    // ID'ye göre ders getir
    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ders bulunamadı: " + id));
    }
    
    // Derse göre öğrencileri getir
    public List<Student> getStudentsByCourse(Long courseId) {
        Course course = getCourseById(courseId);
        return course.getStudents();
    }
    
    // Statüye göre dersleri getir (PENDING, APPROVED, REJECTED)
    public List<Course> getCoursesByStatus(CourseStatus status) {
        return courseRepository.findByStatus(status);
    }
    
    // Öğretmene göre dersleri getir
    public List<Course> getCoursesByTeacher(Long teacherId) {
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Öğretmen bulunamadı: " + teacherId));
        return courseRepository.findByTeacher(teacher);
    }
    
    // Yeni ders oluştur
    public Course createCourse(Course course) {
        course.setStatus(CourseStatus.PENDING); // Yeni ders varsayılan olarak PENDING
        return courseRepository.save(course);
    }
    
    // Ders güncelle
    public Course updateCourse(Long id, Course courseDetails) {
        Course course = getCourseById(id);
        course.setName(courseDetails.getName());
        course.setCode(courseDetails.getCode());
        course.setDescription(courseDetails.getDescription());
        course.setTeacher(courseDetails.getTeacher());
        return courseRepository.save(course);
    }
    
    // Ders durumunu güncelle
    public Course updateCourseStatus(Long id, CourseStatus status) {
        Course course = getCourseById(id);
        course.setStatus(status);
        return courseRepository.save(course);
    }
    
    // Dersi sil
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
    
    // Derse öğrenci ekle
    public Course addStudentToCourse(Long courseId, Long studentId) {
        Course course = getCourseById(courseId);
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Öğrenci bulunamadı: " + studentId));
        
        List<Student> students = course.getStudents();
        if (!students.contains(student)) {
            students.add(student);
            course.setStudents(students);
            
            List<Course> courses = student.getCourses();
            if (!courses.contains(course)) {
                courses.add(course);
                student.setCourses(courses);
                studentRepository.save(student);
            }
        }
        
        return courseRepository.save(course);
    }
    
    // Dersten öğrenciyi çıkar
    public Course removeStudentFromCourse(Long courseId, Long studentId) {
        Course course = getCourseById(courseId);
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Öğrenci bulunamadı: " + studentId));
        
        List<Student> students = course.getStudents();
        if (students.contains(student)) {
            students.remove(student);
            course.setStudents(students);
            
            List<Course> courses = student.getCourses();
            courses.remove(course);
            student.setCourses(courses);
            studentRepository.save(student);
        }
        
        return courseRepository.save(course);
    }
}
