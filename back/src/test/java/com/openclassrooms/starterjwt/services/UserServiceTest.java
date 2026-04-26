package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class UserServiceTest {
    @Mock
    UserRepository userRepository;
    @InjectMocks
    UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userService = new UserService(userRepository);
    }

    @Test
    void findById_success() {
        User user = new User();
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        assertEquals(user, userService.findById(1L));
    }

    @Test
    void findById_notFound() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> userService.findById(1L));
    }

    @Test
    void delete_success() {
        User user = new User();
        user.setEmail("test@test.com");
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        doNothing().when(userRepository).deleteById(anyLong());
        assertDoesNotThrow(() -> userService.delete(1L, "test@test.com"));
    }

    @Test
    void delete_unauthorized() {
        User user = new User();
        user.setEmail("other@test.com");
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        assertThrows(ResponseStatusException.class, () -> userService.delete(1L, "test@test.com"));
    }

    @Test
    void findByEmail_success() {
        User user = new User();
        when(userRepository.findByEmail(anyString())).thenReturn(user);
        assertEquals(user, userService.findByEmail("test@test.com"));
    }

    @Test
    void findByEmail_notFound() {
        when(userRepository.findByEmail(anyString())).thenReturn(null);
        assertNull(userService.findByEmail("notfound@test.com"));
    }

    @Test
    void existsByEmail() {
        when(userRepository.existsByEmail(anyString())).thenReturn(true);
        assertTrue(userService.existsByEmail("test@test.com"));
    }

    @Test
    void save_success() {
        User user = new User();
        when(userRepository.save(any(User.class))).thenReturn(user);
        assertEquals(user, userService.save(user));
    }
}
