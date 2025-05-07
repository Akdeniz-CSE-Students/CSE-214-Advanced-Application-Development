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
        
        System.out.println("-----------------------------------------------");
        System.out.println("🔑 GİRİŞ DENEMESI: username=" + username + ", şifre=" + password);
        System.out.println("-----------------------------------------------");
        
        try {
            // Öğrenci numarası ile giriş denemesi
            Optional<Student> studentByNumber = studentRepository.findByStudentNumber(username);
            if (studentByNumber.isPresent()) {
                Student student = studentByNumber.get();
                System.out.println("👨‍🎓 Öğrenci numarasıyla bulundu: " + student.getUsername());
                System.out.println("   - Öğrenci ID: " + student.getId());
                System.out.println("   - Öğrenci No: " + student.getStudentNumber());
                System.out.println("   - Şifre hash: " + student.getPassword());
                
                // Öğrenci numarası ile giriş için kendisi şifre olarak kabul edilir
                if (username.equals(password)) {
                    System.out.println("✅ Öğrenci numarası şifre olarak kabul edildi");
                    return createSuccessResponse(student);
                } else if (passwordMatches(password, student.getPassword())) {
                    System.out.println("✅ Şifre BCrypt ile eşleşti");
                    return createSuccessResponse(student);
                } else {
                    System.out.println("❌ Şifre eşleşmiyor (öğrenci)");
                    System.out.println("   - Beklenen hash: " + student.getPassword());
                    System.out.println("   - Verilen şifre: " + password);
                }
            } else {
                System.out.println("❓ Bu numaraya sahip öğrenci bulunamadı: " + username);
            }
            
            // Kullanıcı adı ile öğrenci kontrolü 
            Optional<Student> studentByUsername = studentRepository.findByUsername(username);
            if (studentByUsername.isPresent()) {
                Student student = studentByUsername.get();
                System.out.println("👨‍🎓 Kullanıcı adıyla öğrenci bulundu: " + student.getUsername());
                System.out.println("   - Öğrenci ID: " + student.getId());
                System.out.println("   - Öğrenci No: " + student.getStudentNumber());
                System.out.println("   - Şifre hash: " + student.getPassword());
                
                if (passwordMatches(password, student.getPassword())) {
                    System.out.println("✅ Şifre BCrypt ile eşleşti");
                    return createSuccessResponse(student);
                } else {
                    System.out.println("❌ Şifre eşleşmiyor (öğrenci kullanıcı adı)");
                }
            } else {
                System.out.println("❓ Bu kullanıcı adına sahip öğrenci bulunamadı: " + username);
            }
            
            // Öğretmen olarak kontrol et
            Optional<Teacher> teacherByUsername = teacherRepository.findByUsername(username);
            if (teacherByUsername.isPresent()) {
                Teacher teacher = teacherByUsername.get();
                System.out.println("👨‍🏫 Öğretmen bulundu: " + teacher.getUsername());
                System.out.println("   - Öğretmen ID: " + teacher.getId());
                System.out.println("   - Öğretmen No: " + teacher.getTeacherId());
                System.out.println("   - Şifre hash: " + teacher.getPassword());
                
                // Test modu - 1234 şifresi ile giriş
                if ("1234".equals(password)) {
                    System.out.println("✅ Test şifresi (1234) kabul edildi");
                    return createSuccessResponse(teacher);
                } else if (passwordMatches(password, teacher.getPassword())) {
                    System.out.println("✅ Şifre BCrypt ile eşleşti");
                    return createSuccessResponse(teacher);
                } else {
                    System.out.println("❌ Şifre eşleşmiyor (öğretmen)");
                    System.out.println("   - Beklenen hash: " + teacher.getPassword());
                    System.out.println("   - Verilen şifre: " + password);
                }
            } else {
                System.out.println("❓ Bu kullanıcı adına sahip öğretmen bulunamadı: " + username);
            }
            
            System.out.println("❌ GİRİŞ BAŞARISIZ: Kullanıcı bulunamadı veya şifre hatalı: " + username);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Geçersiz kullanıcı adı veya şifre"));
                    
        } catch (Exception e) {
            System.out.println("🚨 Giriş sırasında hata: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Giriş işlemi sırasında hata oluştu: " + e.getMessage()));
        }
    }
    
    private boolean passwordMatches(String rawPassword, String encodedPassword) {
        System.out.println("🔍 Şifre karşılaştırılıyor...");

        // 1. Boş şifre kontrolü
        if (rawPassword == null || rawPassword.isEmpty()) {
            System.out.println("   - Boş şifre kabul edildi (test modu)");
            return true;
        }
        
        // 2. Direkt eşleşme kontrolü
        if (rawPassword.equals(encodedPassword)) {
            System.out.println("   - Direkt şifre eşleşmesi");
            return true;
        }
        
        // 3. Encodlanmamış şifre kontrolü - 1234 ve student_no
        if ("1234".equals(rawPassword) || encodedPassword.contains(rawPassword)) {
            System.out.println("   - Test şifresi (1234) veya öğrenci no ile eşleşme");
            return true;
        }
        
        // 4. BCrypt ile şifre kontrolü
        try {
            boolean matches = passwordEncoder.matches(rawPassword, encodedPassword);
            System.out.println("   - BCrypt şifre kontrolü: " + (matches ? "BAŞARILI" : "BAŞARISIZ"));
            return matches;
        } catch (Exception e) {
            System.out.println("   - Şifre karşılaştırmada hata: " + e.getMessage());
            return false;
        }
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
        
        System.out.println("✅ GİRİŞ BAŞARILI: " + user.getUsername() + " (" + user.getRole() + ")");
        System.out.println("-----------------------------------------------");
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