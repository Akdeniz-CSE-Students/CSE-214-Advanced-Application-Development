package com.efekurucay.lab09.repository;

import com.efekurucay.lab09.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
