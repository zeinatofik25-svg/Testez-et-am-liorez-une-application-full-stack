package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.mapper.TeacherMapper;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.services.TeacherService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

class TeacherControllerTest {

    @Mock
    private TeacherService teacherService;

    @Mock
    private TeacherMapper teacherMapper;

    private TeacherController teacherController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        teacherController = new TeacherController(teacherService, teacherMapper);
    }

    @Test
    void findById_returnsMappedDto() {
        Teacher teacher = new Teacher();
        TeacherDto dto = new TeacherDto();

        when(teacherService.findById(anyLong())).thenReturn(teacher);
        when(teacherMapper.toDto(teacher)).thenReturn(dto);

        ResponseEntity<TeacherDto> response = teacherController.findById("1");

        assertEquals(200, response.getStatusCode().value());
        assertEquals(dto, response.getBody());
    }

    @Test
    void findAll_returnsMappedDtos() {
        List<Teacher> teachers = Collections.singletonList(new Teacher());
        List<TeacherDto> dtos = Collections.singletonList(new TeacherDto());

        when(teacherService.findAll()).thenReturn(teachers);
        when(teacherMapper.toDto(teachers)).thenReturn(dtos);

        ResponseEntity<List<TeacherDto>> response = teacherController.findAll();

        assertEquals(200, response.getStatusCode().value());
        assertEquals(dtos, response.getBody());
    }
}
