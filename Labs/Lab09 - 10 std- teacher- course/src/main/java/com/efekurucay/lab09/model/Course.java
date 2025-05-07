package com.efekurucay.lab09.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String code;
    
    private String description;
    
    @Enumerated(EnumType.STRING)
    private CourseStatus status = CourseStatus.PENDING;

    @ManyToOne 
    @JoinColumn(name = "teacher_id")
    @JsonIgnoreProperties({"courses", "students", "password"})
    private Teacher teacher;

    @ManyToMany(mappedBy = "courses")
    @JsonIgnoreProperties({"courses", "password", "teacher"})
    private List<Student> students;
    
    // Kurs durumu için enum
    public enum CourseStatus {
        PENDING, APPROVED, REJECTED
    }
}

// course id , name, kod, teacher, ogrenci