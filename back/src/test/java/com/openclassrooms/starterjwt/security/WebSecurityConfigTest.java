package com.openclassrooms.starterjwt.security;

import com.openclassrooms.starterjwt.security.jwt.AuthTokenFilter;
import com.openclassrooms.starterjwt.security.services.UserDetailsServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class WebSecurityConfigTest {

    @Mock
    private UserDetailsServiceImpl userDetailsService;

    private WebSecurityConfig webSecurityConfig;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        webSecurityConfig = new WebSecurityConfig();
        ReflectionTestUtils.setField(webSecurityConfig, "userDetailsService", userDetailsService);
    }

    @Test
    void authenticationJwtTokenFilter_returnsInstance() {
        AuthTokenFilter filter = webSecurityConfig.authenticationJwtTokenFilter();
        assertNotNull(filter);
    }

    @Test
    void passwordEncoder_isBCrypt() {
        assertTrue(webSecurityConfig.passwordEncoder().matches("pwd", webSecurityConfig.passwordEncoder().encode("pwd")));
    }

    @Test
    void authenticationProvider_isConfigured() {
        DaoAuthenticationProvider provider = webSecurityConfig.authenticationProvider();
        assertNotNull(provider);
    }

    @Test
    void authenticationManager_returnsConfiguredManager() throws Exception {
        AuthenticationConfiguration authConfiguration = mock(AuthenticationConfiguration.class);
        AuthenticationManager authenticationManager = mock(AuthenticationManager.class);
        when(authConfiguration.getAuthenticationManager()).thenReturn(authenticationManager);

        AuthenticationManager result = webSecurityConfig.authenticationManager(authConfiguration);

        assertNotNull(result);
    }
}
