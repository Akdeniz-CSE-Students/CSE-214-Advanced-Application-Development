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
        // Önce Student olarak arama
        Optional<Student> studentOptional = studentRepository.findByUsername(username);
        if (studentOptional.isPresent()) {
            return buildUserDetails(studentOptional.get());
        }

        // Sonra Teacher olarak arama
        Optional<Teacher> teacherOptional = teacherRepository.findByUsername(username);
        if (teacherOptional.isPresent()) {
            return buildUserDetails(teacherOptional.get());
        }

        // Kullanıcı bulunamadı
        throw new UsernameNotFoundException("Kullanıcı bulunamadı: " + username);
    }

    private UserDetails buildUserDetails(User user) {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
        
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities
        );
    }
} 