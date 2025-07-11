package com.schoolregistry.school.controller.dto;

import com.schoolregistry.school.repository.entity.enumeration.SchoolType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.UUID;

import static lombok.AccessLevel.PRIVATE;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class SchoolResponseDto {

    UUID id;
    String name;
    String edrpou;
    String region;
    SchoolType type;
    Boolean isActive;
    Instant createdDate;
} 