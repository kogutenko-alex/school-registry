package com.schoolregistry.school.repository;

import com.schoolregistry.school.repository.entity.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SchoolRepository extends JpaRepository<School, UUID>, JpaSpecificationExecutor<School> {

    Optional<School> findByEdrpou(String edrpou);
    
    boolean existsByEdrpou(String edrpou);
} 