package com.openclassrooms.starterjwt.security.services;

import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

class UserDetailsServiceImplTest {

    @Mock
    private UserRepository userRepository;

    private UserDetailsServiceImpl userDetailsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userDetailsService = new UserDetailsServiceImpl(userRepository);
    }

    @Test
    void loadUserByUsername_returnsMappedUserDetails() {
        User user = new User();
        user.setId(1L);
        user.setEmail("mail@test.com");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setPassword("pwd");

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));

        UserDetailsImpl details = (UserDetailsImpl) userDetailsService.loadUserByUsername("mail@test.com");

        assertEquals(user.getId(), details.getId());
        assertEquals(user.getEmail(), details.getUsername());
        assertEquals(user.getFirstName(), details.getFirstName());
    }

    @Test
    void loadUserByUsername_throwsWhenMissing() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> userDetailsService.loadUserByUsername("missing@test.com"));
    }
}
