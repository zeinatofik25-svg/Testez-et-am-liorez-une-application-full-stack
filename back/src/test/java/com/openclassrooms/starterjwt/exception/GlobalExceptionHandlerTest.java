package com.openclassrooms.starterjwt.exception;

import com.openclassrooms.starterjwt.payload.response.MessageResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler handler = new GlobalExceptionHandler();

    @Test
    void handleNumberFormatException_returnsBadRequest() {
        ResponseEntity<Void> response = handler.handleNumberFormatException(new NumberFormatException("bad"));
        assertEquals(400, response.getStatusCode().value());
    }

    @Test
    void handleNotFoundException_returnsNotFound() {
        ResponseEntity<Void> response = handler.handleNotFoundException(new NotFoundException());
        assertEquals(404, response.getStatusCode().value());
    }

    @Test
    void handleBadRequestException_returnsBadRequest() {
        ResponseEntity<Void> response = handler.handleBadRequestException(new BadRequestException());
        assertEquals(400, response.getStatusCode().value());
    }

    @Test
    void handleIllegalArgumentException_returnsMessage() {
        ResponseEntity<MessageResponse> response = handler.handleIllegalArgumentException(new IllegalArgumentException("boom"));
        assertEquals(400, response.getStatusCode().value());
        assertEquals("boom", response.getBody().getMessage());
    }
}
