package com.openclassrooms.starterjwt;

import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mockStatic;

class SpringBootSecurityJwtApplicationTest {

    @Test
    void class_hasExpectedAnnotations() {
        assertNotNull(SpringBootSecurityJwtApplication.class.getAnnotation(SpringBootApplication.class));
        assertNotNull(SpringBootSecurityJwtApplication.class.getAnnotation(EnableJpaAuditing.class));
    }

    @Test
    void main_invokesSpringApplicationRun() {
        try (MockedStatic<SpringApplication> springApplicationMockedStatic = mockStatic(SpringApplication.class)) {
            SpringBootSecurityJwtApplication.main(new String[]{});

            springApplicationMockedStatic.verify(
                    () -> SpringApplication.run(SpringBootSecurityJwtApplication.class, new String[]{})
            );
        }
    }
}
