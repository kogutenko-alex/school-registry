package com.schoolregistry.school.controller.dto;

import com.schoolregistry.school.repository.entity.enumeration.SchoolType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import static lombok.AccessLevel.PRIVATE;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class SchoolRequestDto {

    @NotBlank(message = "Назва школи є обов'язковою")
    String name;

    @NotBlank(message = "ЄДРПОУ є обов'язковим")
    String edrpou;

    @NotBlank(message = "Регіон є обов'язковим")
    String region;

    @NotNull(message = "Тип школи є обов'язковим")
    SchoolType type;
}
