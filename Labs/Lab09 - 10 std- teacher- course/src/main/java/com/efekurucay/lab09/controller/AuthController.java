package com.efekurucay.lab09.controller;

/*
 * Bu controller devre dışı bırakıldı.
 * SimpleAuthController kullanılıyor.
 */
//@RestController
//@RequestMapping("/api/auth")
public class AuthController {

    /*
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        // Metodun içeriği kaldırıldı
        return null;
    }
    */

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