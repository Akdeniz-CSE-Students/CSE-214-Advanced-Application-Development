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

//id, isim, soyisim department, courses 

public class Teacher extends User {

    @Column(unique = true)
    private String teacherId;

    private String department;

    @OneToMany(mappedBy = "teacher")
    @JsonIgnoreProperties({"teacher", "students"})
    private List<Course> courses;
    
    @OneToMany(mappedBy = "teacher")
    @JsonIgnoreProperties({"teacher", "courses"})
    private List<Student> students;
}
