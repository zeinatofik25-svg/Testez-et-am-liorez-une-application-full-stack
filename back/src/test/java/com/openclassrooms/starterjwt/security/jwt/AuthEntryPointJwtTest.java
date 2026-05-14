package com.openclassrooms.starterjwt.security.jwt;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class AuthEntryPointJwtTest {

    @Test
    void constructor_createsInstance() {
        AuthEntryPointJwt entryPoint = new AuthEntryPointJwt();
        assertNotNull(entryPoint);
    }
}
