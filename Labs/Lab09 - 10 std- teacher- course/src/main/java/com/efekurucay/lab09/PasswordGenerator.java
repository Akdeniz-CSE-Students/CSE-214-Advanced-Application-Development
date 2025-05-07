package com.efekurucay.lab09;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println("Şifre '1234' için hash: " + encoder.encode("1234"));
        System.out.println("Şifre 'S001' için hash: " + encoder.encode("S001"));
        System.out.println("Şifre 'S002' için hash: " + encoder.encode("S002"));
        System.out.println("Şifre 'S003' için hash: " + encoder.encode("S003"));
    }
} 