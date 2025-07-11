package com.schoolregistry.school.service;

import com.schoolregistry.common.exception.BusinessException;
import com.schoolregistry.school.repository.entity.School;
import com.schoolregistry.school.repository.SchoolRepository;
import com.schoolregistry.school.service.filter.SchoolFilter;
import com.schoolregistry.school.service.spec.SchoolSpecification;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SchoolService {

    SchoolRepository schoolRepository;

    @Transactional(readOnly = true)
    public Page<School> findAllByFilter(SchoolFilter filter, Pageable pageable) {
        Specification<School> spec = Specification.where(SchoolSpecification.hasName(filter.getName()))
                .and(SchoolSpecification.hasRegion(filter.getRegion()))
                .and(SchoolSpecification.hasTypes(filter.getTypes()))
                .and(SchoolSpecification.hasStatuses(filter.getStatuses()));
        
        // Якщо немає сортування, використовуємо сортування за датою створення (найновіші спочатку)
        if (pageable.getSort().isEmpty()) {
            pageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "createdDate")
            );
        }
        
        return schoolRepository.findAll(spec, pageable);
    }

    @Transactional(readOnly = true)
    public Optional<School> findById(UUID id) {
        return schoolRepository.findById(id);
    }

    public School save(School school) {
        if (school.getId() == null && schoolRepository.existsByEdrpou(school.getEdrpou())) {
            throw new BusinessException("Школа із ЄДРОП " + school.getEdrpou() + " вже існує");
        }
        
        return schoolRepository.save(school);
    }

}
