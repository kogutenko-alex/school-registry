package com.schoolregistry.school.controller;

import com.schoolregistry.common.util.ApiPageable;
import com.schoolregistry.school.controller.dto.SchoolRequestDto;
import com.schoolregistry.school.controller.dto.SchoolResponseDto;
import com.schoolregistry.common.response.PageResponse;
import com.schoolregistry.school.controller.facade.SchoolFacade;
import com.schoolregistry.school.service.filter.SchoolFilter;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/schools")
@CrossOrigin(origins = "http://localhost:3000")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SchoolController {

    SchoolFacade schoolFacade;

	@ApiPageable
    @GetMapping
    public ResponseEntity<PageResponse<SchoolResponseDto>> getAllSchools(
            @ParameterObject SchoolFilter filterDto,
            @Parameter(hidden = true) Pageable pageable
    ) {
        PageResponse<SchoolResponseDto> schools = schoolFacade.findAllByFilter(filterDto, pageable);
        return ResponseEntity.ok(schools);
    }

    @GetMapping("/{schoolId}")
    public ResponseEntity<SchoolResponseDto> getSchoolById(
            @PathVariable UUID schoolId
    ) {
        SchoolResponseDto school = schoolFacade.findById(schoolId);
        return ResponseEntity.ok(school);
    }

    @PostMapping
    public ResponseEntity<SchoolResponseDto> createSchool(
            @RequestBody @Valid SchoolRequestDto requestDto
    ) {
        SchoolResponseDto createdSchool = schoolFacade.create(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSchool);
    }

    @PatchMapping("/{schoolId}/deactivate")
    public ResponseEntity<SchoolResponseDto> deactivateSchool(
            @PathVariable UUID schoolId
    ) {
        SchoolResponseDto deactivatedSchool = schoolFacade.deactivate(schoolId);
        return ResponseEntity.ok(deactivatedSchool);
    }
} 