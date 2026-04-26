package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.repository.TeacherRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class TeacherServiceTest {
    @Mock
    TeacherRepository teacherRepository;
    @InjectMocks
    TeacherService teacherService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        teacherService = new TeacherService(teacherRepository);
    }

    @Test
    void findAll_success() {
        List<Teacher> teachers = Arrays.asList(new Teacher(), new Teacher());
        when(teacherRepository.findAll()).thenReturn(teachers);
        assertEquals(2, teacherService.findAll().size());
    }

    @Test
    void findById_success() {
        Teacher teacher = new Teacher();
        when(teacherRepository.findById(anyLong())).thenReturn(Optional.of(teacher));
        assertEquals(teacher, teacherService.findById(1L));
    }

    @Test
    void findById_notFound() {
        when(teacherRepository.findById(anyLong())).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> teacherService.findById(1L));
    }
}
