package com.efekurucay.lab09.repository;

import com.efekurucay.lab09.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
}
