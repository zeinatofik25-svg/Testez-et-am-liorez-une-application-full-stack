package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class SessionServiceTest {
    @Mock
    SessionRepository sessionRepository;
    @Mock
    UserRepository userRepository;
    @InjectMocks
    SessionService sessionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        sessionService = new SessionService(sessionRepository, userRepository);
    }

    @Test
    void create_success() {
        Session session = new Session();
        when(sessionRepository.save(any(Session.class))).thenReturn(session);
        assertEquals(session, sessionService.create(session));
    }

    @Test
    void delete_success() {
        Session session = new Session();
        when(sessionRepository.findById(anyLong())).thenReturn(Optional.of(session));
        doNothing().when(sessionRepository).deleteById(anyLong());
        assertDoesNotThrow(() -> sessionService.delete(1L));
    }

    @Test
    void delete_notFound() {
        when(sessionRepository.findById(anyLong())).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> sessionService.delete(1L));
    }

    @Test
    void findAll_success() {
        List<Session> sessions = Arrays.asList(new Session(), new Session());
        when(sessionRepository.findAll()).thenReturn(sessions);
        assertEquals(2, sessionService.findAll().size());
    }

    @Test
    void getById_success() {
        Session session = new Session();
        when(sessionRepository.findById(anyLong())).thenReturn(Optional.of(session));
        assertEquals(session, sessionService.getById(1L));
    }

    @Test
    void getById_notFound() {
        when(sessionRepository.findById(anyLong())).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> sessionService.getById(1L));
    }

    @Test
    void update_success() {
        Session session = new Session();
        when(sessionRepository.save(any(Session.class))).thenReturn(session);
        assertEquals(session, sessionService.update(1L, session));
    }

    @Test
    void participate_success() {
        Session session = new Session();
        User user = new User();
        when(sessionRepository.findById(anyLong())).thenReturn(Optional.of(session));
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        assertDoesNotThrow(() -> sessionService.participate(1L, 2L));
    }

    @Test
    void participate_sessionNotFound() {
        when(sessionRepository.findById(anyLong())).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> sessionService.participate(1L, 2L));
    }

    @Test
    void participate_userNotFound() {
        Session session = new Session();
        when(sessionRepository.findById(anyLong())).thenReturn(Optional.of(session));
        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> sessionService.participate(1L, 2L));
    }
}
