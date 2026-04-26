package com.openclassrooms.starterjwt.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.services.TeacherService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.util.Collections;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TeacherController.class)
class TeacherControllerIT {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private TeacherService teacherService;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllTeachers_success() throws Exception {
        Mockito.when(teacherService.findAll()).thenReturn(Collections.emptyList());
        mockMvc.perform(get("/api/teacher"))
                .andExpect(status().isOk());
    }

    @Test
    void getTeacherById_success() throws Exception {
        Mockito.when(teacherService.findById(anyLong())).thenReturn(new Teacher());
        mockMvc.perform(get("/api/teacher/1"))
                .andExpect(status().isOk());
    }
}
