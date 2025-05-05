package com.efekurucay.lab09.repository;

import com.efekurucay.lab09.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
