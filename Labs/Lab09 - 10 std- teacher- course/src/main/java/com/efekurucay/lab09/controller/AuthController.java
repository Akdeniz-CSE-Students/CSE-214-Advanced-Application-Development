package com.efekurucay.lab09.controller;

import com.efekurucay.lab09.model.User;
import com.efekurucay.lab09.security.JwtUtil;
import com.efekurucay.lab09.security.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            System.out.println("---------------------------------------------------");
            System.out.println("Giriş isteği alındı: kullanıcı adı = " + authenticationRequest.getUsername());
            System.out.println("Şifre uzunluğu: " + (authenticationRequest.getPassword() != null ? authenticationRequest.getPassword().length() : "null"));
            
            // Kimlik doğrulama denemesi öncesi UserDetails'i manuel olarak alıp kontrol etme
            try {
                UserDetails checkUser = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
                System.out.println("Kullanıcı bulundu, kimlik doğrulama deneniyor...");
            } catch (UsernameNotFoundException e) {
                System.out.println("Kullanıcı bulunamadı (ön kontrol): " + e.getMessage());
                return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Kullanıcı bulunamadı. Lütfen tekrar deneyin."));
            }
            
            // Kimlik doğrulama denemesi
            System.out.println("AuthenticationManager.authenticate çağrılıyor...");
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getUsername(),
                            authenticationRequest.getPassword()
                    )
            );
            
            System.out.println("Kimlik doğrulama başarılı. Token oluşturuluyor...");
            
            // Kimlik doğrulama başarılı ise token oluştur
            final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
            final String jwt = jwtUtil.generateToken(userDetails);
            
            System.out.println("Token oluşturuldu, uzunluk: " + jwt.length());
            System.out.println("---------------------------------------------------");
            
            return ResponseEntity.ok(new AuthenticationResponse(jwt));
            
        } catch (BadCredentialsException e) {
            System.out.println("Hatalı kimlik bilgileri: " + e.getMessage());
            System.out.println("---------------------------------------------------");
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Geçersiz kullanıcı adı veya şifre. Lütfen tekrar deneyin."));
        } catch (UsernameNotFoundException e) {
            System.out.println("Kullanıcı bulunamadı: " + e.getMessage());
            System.out.println("---------------------------------------------------");
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Kullanıcı bulunamadı. Lütfen tekrar deneyin."));
        } catch (Exception e) {
            System.out.println("Giriş işlemi sırasında hata: " + e.getMessage());
            e.printStackTrace();
            System.out.println("---------------------------------------------------");
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Giriş işlemi sırasında bir hata oluştu: " + e.getMessage()));
        }
    }

    public static class AuthenticationRequest {
        private String username;
        private String password;

        // Getter ve Setter'lar
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

    public static class AuthenticationResponse {
        private String token;

        public AuthenticationResponse(String token) {
            this.token = token;
        }

        public String getToken() {
            return token;
        }
    }
    
    public static class ErrorResponse {
        private String message;
        
        public ErrorResponse(String message) {
            this.message = message;
        }
        
        public String getMessage() {
            return message;
        }
    }
} 