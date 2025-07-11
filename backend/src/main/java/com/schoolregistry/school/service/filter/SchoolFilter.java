package com.schoolregistry.school.service.filter;

import com.schoolregistry.school.repository.entity.enumeration.SchoolType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = PROTECTED)
public class SchoolFilter {
    
    String name;

	String region;

	List<SchoolType> types;

	List<Boolean> statuses;

}