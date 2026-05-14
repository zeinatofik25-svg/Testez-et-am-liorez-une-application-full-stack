package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.mapper.SessionMapper;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.services.SessionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class SessionControllerTest {

    @Mock
    private SessionService sessionService;

    @Mock
    private SessionMapper sessionMapper;

    private SessionController sessionController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        sessionController = new SessionController(sessionService, sessionMapper);
    }

    @Test
    void findById_returnsDto() {
        Session session = new Session();
        SessionDto dto = new SessionDto();
        when(sessionService.getById(anyLong())).thenReturn(session);
        when(sessionMapper.toDto(session)).thenReturn(dto);

        ResponseEntity<SessionDto> response = sessionController.findById("1");

        assertEquals(200, response.getStatusCode().value());
        assertEquals(dto, response.getBody());
    }

    @Test
    void findAll_returnsDtos() {
        List<Session> sessions = Collections.singletonList(new Session());
        List<SessionDto> dtos = Collections.singletonList(new SessionDto());
        when(sessionService.findAll()).thenReturn(sessions);
        when(sessionMapper.toDto(sessions)).thenReturn(dtos);

        ResponseEntity<List<SessionDto>> response = sessionController.findAll();

        assertEquals(200, response.getStatusCode().value());
        assertEquals(dtos, response.getBody());
    }

    @Test
    void create_returnsCreatedDto() {
        SessionDto input = new SessionDto();
        Session session = new Session();
        SessionDto output = new SessionDto();

        when(sessionMapper.toEntity(any(SessionDto.class))).thenReturn(session);
        when(sessionService.create(session)).thenReturn(session);
        when(sessionMapper.toDto(session)).thenReturn(output);

        ResponseEntity<SessionDto> response = sessionController.create(input);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(output, response.getBody());
    }

    @Test
    void update_returnsUpdatedDto() {
        SessionDto input = new SessionDto();
        Session session = new Session();
        SessionDto output = new SessionDto();

        when(sessionMapper.toEntity(any(SessionDto.class))).thenReturn(session);
        when(sessionService.update(anyLong(), any(Session.class))).thenReturn(session);
        when(sessionMapper.toDto(session)).thenReturn(output);

        ResponseEntity<SessionDto> response = sessionController.update("1", input);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(output, response.getBody());
    }

    @Test
    void save_returnsOkAndCallsDelete() {
        ResponseEntity<Void> response = sessionController.save("1");

        assertEquals(200, response.getStatusCode().value());
        verify(sessionService).delete(1L);
    }

    @Test
    void participate_returnsOkAndCallsService() {
        ResponseEntity<Void> response = sessionController.participate("1", "2");

        assertEquals(200, response.getStatusCode().value());
        verify(sessionService).participate(1L, 2L);
    }

    @Test
    void noLongerParticipate_returnsOkAndCallsService() {
        ResponseEntity<Void> response = sessionController.noLongerParticipate("1", "2");

        assertEquals(200, response.getStatusCode().value());
        verify(sessionService).noLongerParticipate(1L, 2L);
    }
}
