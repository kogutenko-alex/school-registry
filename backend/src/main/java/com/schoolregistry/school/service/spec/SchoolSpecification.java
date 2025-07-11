package com.schoolregistry.school.service.spec;

import com.schoolregistry.school.repository.entity.School;
import com.schoolregistry.school.repository.entity.enumeration.SchoolType;
import org.springframework.data.jpa.domain.Specification;
import java.util.List;

public class SchoolSpecification {

    public static Specification<School> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null || name.trim().isEmpty()) {
                return null;
            }
            return criteriaBuilder.like(
                criteriaBuilder.lower(root.get("name")),
                "%" + name.toLowerCase() + "%"
            );
        };
    }

    public static Specification<School> hasRegion(String region) {
        return (root, query, criteriaBuilder) -> {
            if (region == null || region.trim().isEmpty()) {
                return null;
            }
            return criteriaBuilder.equal(root.get("region"), region);
        };
    }

    public static Specification<School> hasTypes(List<SchoolType> types) {
        return (root, query, criteriaBuilder) -> {
            if (types == null || types.isEmpty()) {
                return null;
            }
            return root.get("type").in(types);
        };
    }

    public static Specification<School> hasStatuses(List<Boolean> statuses) {
        return (root, query, criteriaBuilder) -> {
            if (statuses == null || statuses.isEmpty()) {
                return null;
            }
            return root.get("isActive").in(statuses);
        };
    }
} 