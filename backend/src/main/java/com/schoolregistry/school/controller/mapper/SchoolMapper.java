package com.schoolregistry.school.controller.mapper;

import com.schoolregistry.school.controller.dto.SchoolRequestDto;
import com.schoolregistry.school.controller.dto.SchoolResponseDto;
import com.schoolregistry.school.repository.entity.School;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SchoolMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "isActive", constant = "true")
    @Mapping(target = "createdDate", ignore = true)
    School toEntity(SchoolRequestDto dto);

    SchoolResponseDto toResponseDto(School entity);

    default List<SchoolResponseDto> toResponseDtos(List<School> entities) {
		return entities.stream()
				.map(this::toResponseDto)
				.toList();
    }
}
