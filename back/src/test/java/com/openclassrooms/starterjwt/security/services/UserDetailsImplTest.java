package com.openclassrooms.starterjwt.security.services;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class UserDetailsImplTest {

    @Test
    void builderAndFlags_workAsExpected() {
        UserDetailsImpl details = UserDetailsImpl.builder()
                .id(1L)
                .username("mail@test.com")
                .firstName("John")
                .lastName("Doe")
                .password("pwd")
                .admin(true)
                .build();

        assertEquals(1L, details.getId());
        assertEquals("mail@test.com", details.getUsername());
        assertTrue(details.getAuthorities().isEmpty());
        assertTrue(details.isAccountNonExpired());
        assertTrue(details.isAccountNonLocked());
        assertTrue(details.isCredentialsNonExpired());
        assertTrue(details.isEnabled());
    }

    @Test
    void equals_isBasedOnId() {
        UserDetailsImpl first = UserDetailsImpl.builder().id(42L).build();
        UserDetailsImpl second = UserDetailsImpl.builder().id(42L).build();
        UserDetailsImpl third = UserDetailsImpl.builder().id(99L).build();

        assertEquals(first, second);
        assertNotEquals(first, third);
    }
}
