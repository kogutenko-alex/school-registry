package com.schoolregistry.school.controller.facade;

import com.schoolregistry.common.response.PageResponse;
import com.schoolregistry.school.controller.dto.SchoolRequestDto;
import com.schoolregistry.school.controller.dto.SchoolResponseDto;
import com.schoolregistry.school.repository.entity.School;
import com.schoolregistry.school.controller.mapper.SchoolMapper;
import com.schoolregistry.school.service.SchoolService;
import com.schoolregistry.school.service.filter.SchoolFilter;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SchoolFacade {

    SchoolService schoolService;
    SchoolMapper schoolMapper;

    public PageResponse<SchoolResponseDto> findAllByFilter(SchoolFilter filter, Pageable pageable) {
        Page<School> schools = schoolService.findAllByFilter(filter, pageable);
        List<SchoolResponseDto> responseDtos = schoolMapper.toResponseDtos(schools.getContent());

        return new PageResponse<>(responseDtos, schools.getTotalElements());
    }

    public SchoolResponseDto findById(UUID id) {
        School school = schoolService.findById(id)
                .orElseThrow(() -> new RuntimeException("School not found with id: " + id));
        return schoolMapper.toResponseDto(school);
    }

    public SchoolResponseDto create(SchoolRequestDto requestDto) {
        School school = schoolMapper.toEntity(requestDto);
        School savedSchool = schoolService.save(school);
        return schoolMapper.toResponseDto(savedSchool);
    }

    public SchoolResponseDto deactivate(UUID id) {
        School school = schoolService.findById(id)
                .orElseThrow(() -> new RuntimeException("School not found with id: " + id));
        
        school.setIsActive(false);
        School savedSchool = schoolService.save(school);
        return schoolMapper.toResponseDto(savedSchool);
    }
}
