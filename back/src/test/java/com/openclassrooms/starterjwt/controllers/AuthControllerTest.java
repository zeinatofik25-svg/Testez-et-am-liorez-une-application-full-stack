package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.payload.request.LoginRequest;
import com.openclassrooms.starterjwt.payload.request.SignupRequest;
import com.openclassrooms.starterjwt.payload.response.JwtResponse;
import com.openclassrooms.starterjwt.payload.response.MessageResponse;
import com.openclassrooms.starterjwt.services.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class AuthControllerTest {

    @Mock
    private AuthService authService;

    private AuthController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        authController = new AuthController(authService);
    }

    @Test
    void authenticateUser_returnsOkResponse() {
        LoginRequest request = new LoginRequest();
        JwtResponse jwtResponse = new JwtResponse("token", 1L, "mail@test.com", "John", "Doe", false);

        when(authService.authenticate(any(LoginRequest.class))).thenReturn(jwtResponse);

        ResponseEntity<JwtResponse> response = authController.authenticateUser(request);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(jwtResponse, response.getBody());
    }

    @Test
    void registerUser_returnsOkResponse() {
        SignupRequest request = new SignupRequest();
        MessageResponse messageResponse = new MessageResponse("ok");

        when(authService.register(any(SignupRequest.class))).thenReturn(messageResponse);

        ResponseEntity<MessageResponse> response = authController.registerUser(request);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(messageResponse, response.getBody());
    }
}
