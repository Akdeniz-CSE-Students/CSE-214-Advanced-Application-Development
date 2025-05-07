package com.efekurucay.lab09.repository;

import com.efekurucay.lab09.model.Course;
import com.efekurucay.lab09.model.Course.CourseStatus;
import com.efekurucay.lab09.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByStatus(CourseStatus status);
    List<Course> findByTeacher(Teacher teacher);
}
