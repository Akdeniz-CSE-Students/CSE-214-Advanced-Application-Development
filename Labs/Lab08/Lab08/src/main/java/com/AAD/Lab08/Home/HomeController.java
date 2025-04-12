package com.AAD.lab08.Home;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class HomeController {
    @GetMapping("/")
    public String message() {
        return "Welcome To The Spring Boot Application";
    }
    @GetMapping("iki")
    public String getMethodName() {
        return "iki";
    }
    
}
