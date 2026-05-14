package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.services.TeacherService;
import com.openclassrooms.starterjwt.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class MapperTest {

    private TeacherMapper teacherMapper;
    private UserMapper userMapper;
    private SessionMapper sessionMapper;

    @BeforeEach
    void setUp() {
        teacherMapper = Mappers.getMapper(TeacherMapper.class);
        userMapper = Mappers.getMapper(UserMapper.class);
        sessionMapper = Mappers.getMapper(SessionMapper.class);

        TeacherService teacherService = mock(TeacherService.class);
        UserService userService = mock(UserService.class);

        Teacher teacher = new Teacher();
        teacher.setId(10L);
        when(teacherService.findById(anyLong())).thenReturn(teacher);

        User firstUser = new User();
        firstUser.setId(1L);
        User secondUser = new User();
        secondUser.setId(2L);
        when(userService.findById(1L)).thenReturn(firstUser);
        when(userService.findById(2L)).thenReturn(secondUser);

        sessionMapper.teacherService = teacherService;
        sessionMapper.userService = userService;
    }

    @Test
    void teacherMapper_mapsEntityAndDto() {
        Teacher entity = new Teacher();
        entity.setId(1L);
        entity.setFirstName("Jane");
        entity.setLastName("Doe");

        TeacherDto dto = teacherMapper.toDto(entity);
        Teacher mappedEntity = teacherMapper.toEntity(dto);

        assertEquals(entity.getId(), dto.getId());
        assertEquals(entity.getFirstName(), dto.getFirstName());
        assertEquals(entity.getLastName(), dto.getLastName());
        assertEquals(dto.getId(), mappedEntity.getId());
    }

    @Test
    void userMapper_mapsEntityAndList() {
        User entity = new User();
        entity.setId(3L);
        entity.setEmail("test@test.com");
        entity.setFirstName("John");
        entity.setLastName("Smith");
        entity.setPassword("pwd");
        entity.setAdmin(true);

        UserDto dto = userMapper.toDto(entity);
        List<UserDto> dtoList = userMapper.toDto(Collections.singletonList(entity));
        List<User> entityList = userMapper.toEntity(dtoList);

        assertEquals(entity.getEmail(), dto.getEmail());
        assertEquals(entity.isAdmin(), dto.isAdmin());
        assertEquals(1, dtoList.size());
        assertEquals(entity.getId(), dtoList.get(0).getId());
        assertEquals(1, entityList.size());
        assertEquals(dtoList.get(0).getEmail(), entityList.get(0).getEmail());
    }

    @Test
    void teacherMapper_mapsListBothWays() {
        TeacherDto dto = new TeacherDto();
        dto.setId(12L);
        dto.setFirstName("Alex");
        dto.setLastName("Moore");

        List<TeacherDto> dtoList = Collections.singletonList(dto);
        List<Teacher> entities = teacherMapper.toEntity(dtoList);
        List<TeacherDto> mappedBack = teacherMapper.toDto(entities);

        assertEquals(1, entities.size());
        assertEquals("Alex", entities.get(0).getFirstName());
        assertEquals(1, mappedBack.size());
        assertEquals(12L, mappedBack.get(0).getId());
    }

    @Test
    void sessionMapper_mapsDtoToEntityAndBack() {
        SessionDto dto = new SessionDto();
        dto.setId(5L);
        dto.setName("Session name");
        dto.setDate(new Date());
        dto.setDescription("desc");
        dto.setTeacher_id(10L);
        dto.setUsers(Arrays.asList(1L, 2L));

        Session entity = sessionMapper.toEntity(dto);
        SessionDto mappedBack = sessionMapper.toDto(entity);

        assertNotNull(entity);
        assertEquals("Session name", entity.getName());
        assertEquals(10L, entity.getTeacher().getId());
        assertEquals(2, entity.getUsers().size());

        assertNotNull(mappedBack);
        assertEquals(entity.getDescription(), mappedBack.getDescription());
        assertEquals(entity.getTeacher().getId(), mappedBack.getTeacher_id());
        assertEquals(2, mappedBack.getUsers().size());
    }

    @Test
    void sessionMapper_handlesNullUsers() {
        SessionDto dto = new SessionDto();
        dto.setName("Session");
        dto.setDate(new Date());
        dto.setDescription("desc");

        Session entity = sessionMapper.toEntity(dto);

        assertNotNull(entity);
        assertNotNull(entity.getUsers());
        assertEquals(0, entity.getUsers().size());
    }

    @Test
    void sessionMapper_mapsLists() {
        SessionDto dto = new SessionDto();
        dto.setName("Session list");
        dto.setDate(new Date());
        dto.setDescription("desc");
        dto.setTeacher_id(10L);
        dto.setUsers(Arrays.asList(1L, 2L));

        List<Session> entities = sessionMapper.toEntity(Collections.singletonList(dto));
        List<SessionDto> mappedBack = sessionMapper.toDto(entities);

        assertEquals(1, entities.size());
        assertEquals("Session list", entities.get(0).getName());
        assertEquals(1, mappedBack.size());
        assertEquals(10L, mappedBack.get(0).getTeacher_id());
    }
}
