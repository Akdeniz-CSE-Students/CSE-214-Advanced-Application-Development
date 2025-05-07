package com.efekurucay.lab09.controller;

import com.efekurucay.lab09.model.Student;
import com.efekurucay.lab09.model.Teacher;
import com.efekurucay.lab09.model.User;
import com.efekurucay.lab09.repository.StudentRepository;
import com.efekurucay.lab09.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class SimpleAuthController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        
        System.out.println("Giriş isteği: username=" + username + ", şifre uzunluğu=" + (password != null ? password.length() : "null"));
        
        try {
            // Önce öğrenci olarak kontrol et
            Optional<Student> studentByNumber = studentRepository.findByStudentNumber(username);
            if (studentByNumber.isPresent()) {
                Student student = studentByNumber.get();
                System.out.println("Öğrenci numarasıyla bulundu: " + student.getUsername());
                
                if (passwordMatches(password, student.getPassword())) {
                    return createSuccessResponse(student);
                } else {
                    System.out.println("Şifre eşleşmiyor (öğrenci)");
                }
            }
            
            // Sonra normal kullanıcı adıyla öğrenci kontrol et
            Optional<Student> studentByUsername = studentRepository.findByUsername(username);
            if (studentByUsername.isPresent()) {
                Student student = studentByUsername.get();
                System.out.println("Kullanıcı adıyla öğrenci bulundu: " + student.getUsername());
                
                if (passwordMatches(password, student.getPassword())) {
                    return createSuccessResponse(student);
                } else {
                    System.out.println("Şifre eşleşmiyor (öğrenci kullanıcı adı)");
                }
            }
            
            // Öğretmen olarak kontrol et
            Optional<Teacher> teacherByUsername = teacherRepository.findByUsername(username);
            if (teacherByUsername.isPresent()) {
                Teacher teacher = teacherByUsername.get();
                System.out.println("Öğretmen bulundu: " + teacher.getUsername());
                
                if (passwordMatches(password, teacher.getPassword())) {
                    return createSuccessResponse(teacher);
                } else {
                    System.out.println("Şifre eşleşmiyor (öğretmen)");
                }
            }
            
            System.out.println("Kullanıcı bulunamadı: " + username);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Geçersiz kullanıcı adı veya şifre"));
                    
        } catch (Exception e) {
            System.out.println("Giriş sırasında hata: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Giriş işlemi sırasında hata oluştu"));
        }
    }
    
    private boolean passwordMatches(String rawPassword, String encodedPassword) {
        System.out.println("Şifre karşılaştırılıyor...");
        // Şifre boş verilmişse test için kabul ediyoruz
        if (rawPassword == null || rawPassword.isEmpty()) {
            System.out.println("Boş şifre kabul edildi (test modu)");
            return true;
        }
        
        // Direkt şifre kontrolü (test için)
        System.out.println("Basit şifre kontrolü: " + (encodedPassword.endsWith(rawPassword) ? "Eşleşiyor" : "Eşleşmiyor"));
        if (encodedPassword.endsWith(rawPassword)) {
            System.out.println("Şifre basit karşılaştırma ile eşleşti");
            return true;
        }
        
        // BCrypt ile şifre kontrolü
        boolean matches = passwordEncoder.matches(rawPassword, encodedPassword);
        System.out.println("BCrypt şifre kontrolü sonucu: " + (matches ? "Eşleşti" : "Eşleşmedi"));
        return matches;
    }
    
    private ResponseEntity<?> createSuccessResponse(User user) {
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("name", user.getName());
        response.put("surname", user.getSurname());
        response.put("email", user.getEmail());
        response.put("role", user.getRole().toString());
        
        if (user instanceof Student) {
            Student student = (Student) user;
            response.put("studentNumber", student.getStudentNumber());
            response.put("teacherId", student.getTeacher() != null ? student.getTeacher().getId() : null);
        } else if (user instanceof Teacher) {
            Teacher teacher = (Teacher) user;
            response.put("teacherId", teacher.getTeacherId());
            response.put("department", teacher.getDepartment());
        }
        
        System.out.println("Giriş başarılı: " + user.getUsername() + " (" + user.getRole() + ")");
        return ResponseEntity.ok(response);
    }
    
    public static class LoginRequest {
        private String username;
        private String password;
        
        public String getUsername() {
            return username;
        }
        
        public void setUsername(String username) {
            this.username = username;
        }
        
        public String getPassword() {
            return password;
        }
        
        public void setPassword(String password) {
            this.password = password;
        }
    }
} 