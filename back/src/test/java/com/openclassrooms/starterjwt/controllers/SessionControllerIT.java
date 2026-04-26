package com.openclassrooms.starterjwt.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.services.SessionService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.util.Collections;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SessionController.class)
class SessionControllerIT {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private SessionService sessionService;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllSessions_success() throws Exception {
        Mockito.when(sessionService.findAll()).thenReturn(Collections.emptyList());
        mockMvc.perform(get("/api/session"))
                .andExpect(status().isOk());
    }

    @Test
    void createSession_success() throws Exception {
        Session session = new Session();
        Mockito.when(sessionService.create(any(Session.class))).thenReturn(session);
        mockMvc.perform(post("/api/session")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(session)))
                .andExpect(status().isOk());
    }

    @Test
    void deleteSession_success() throws Exception {
        Mockito.doNothing().when(sessionService).delete(anyLong());
        mockMvc.perform(delete("/api/session/1"))
                .andExpect(status().isOk());
    }
}
