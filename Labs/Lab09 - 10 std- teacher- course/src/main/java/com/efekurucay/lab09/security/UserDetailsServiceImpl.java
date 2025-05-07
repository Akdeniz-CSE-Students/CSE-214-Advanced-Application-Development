package com.efekurucay.lab09.security;

import com.efekurucay.lab09.model.Student;
import com.efekurucay.lab09.model.Teacher;
import com.efekurucay.lab09.model.User;
import com.efekurucay.lab09.repository.StudentRepository;
import com.efekurucay.lab09.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            System.out.println("Kullanıcı adı veya öğrenci numarası aranıyor: " + username);
            
            // Önce Student olarak öğrenci numarasıyla arama
            Optional<Student> studentByNumber = studentRepository.findByStudentNumber(username);
            if (studentByNumber.isPresent()) {
                Student student = studentByNumber.get();
                System.out.println("Öğrenci numarasıyla bulundu: " + student.getUsername());
                return buildUserDetails(student);
            }
            
            // Sonra Student olarak username ile arama
            Optional<Student> studentOptional = studentRepository.findByUsername(username);
            if (studentOptional.isPresent()) {
                Student student = studentOptional.get();
                System.out.println("Öğrenci kullanıcı adıyla bulundu: " + student.getUsername());
                return buildUserDetails(student);
            }

            // Sonra Teacher olarak arama
            Optional<Teacher> teacherOptional = teacherRepository.findByUsername(username);
            if (teacherOptional.isPresent()) {
                Teacher teacher = teacherOptional.get();
                System.out.println("Öğretmen kullanıcı adıyla bulundu: " + teacher.getUsername());
                return buildUserDetails(teacher);
            }

            // Kullanıcı bulunamadı
            System.out.println("Kullanıcı bulunamadı: " + username);
            throw new UsernameNotFoundException("Kullanıcı bulunamadı: " + username);
        } catch (Exception e) {
            System.out.println("Kullanıcı arama sırasında hata: " + e.getMessage());
            throw new UsernameNotFoundException("Kullanıcı arama hatası: " + e.getMessage());
        }
    }

    private UserDetails buildUserDetails(User user) {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
        
        System.out.println("UserDetails oluşturuldu: " + user.getUsername() + ", Rol: " + user.getRole().name());
        
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities
        );
    }
} 