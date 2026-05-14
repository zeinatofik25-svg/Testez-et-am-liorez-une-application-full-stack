package com.openclassrooms.starterjwt.security.jwt;

import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.util.ReflectionTestUtils;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class JwtUtilsTest {

    private JwtUtils jwtUtils;

    @BeforeEach
    void setUp() {
        jwtUtils = new JwtUtils();
        String strongSecret = Base64.getEncoder().encodeToString(
                "0123456789012345678901234567890123456789012345678901234567890123".getBytes(StandardCharsets.UTF_8)
        );
        ReflectionTestUtils.setField(jwtUtils, "jwtSecret", strongSecret);
        ReflectionTestUtils.setField(jwtUtils, "jwtExpirationMs", 60_000);
    }

    @Test
    void generateAndValidateToken_success() {
        UserDetailsImpl principal = UserDetailsImpl.builder()
                .id(1L)
                .username("mail@test.com")
                .build();
        Authentication authentication = new UsernamePasswordAuthenticationToken(principal, null);

        String token = jwtUtils.generateJwtToken(authentication);

        assertNotNull(token);
        assertTrue(jwtUtils.validateJwtToken(token));
        assertEquals("mail@test.com", jwtUtils.getUserNameFromJwtToken(token));
    }

    @Test
    void validateJwtToken_falseOnInvalidToken() {
        assertFalse(jwtUtils.validateJwtToken("bad-token"));
    }
}
