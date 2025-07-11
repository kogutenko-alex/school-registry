package com.schoolregistry.school.repository.entity;

import com.schoolregistry.school.repository.entity.enumeration.SchoolType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.UUID;

import static lombok.AccessLevel.PRIVATE;

@Entity
@Table(name = "schools")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class School {

	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(
			name = "UUID",
			strategy = "org.hibernate.id.UUIDGenerator"
	)
	@Column(name = "id", updatable = false, nullable = false)
    UUID id;

	@NotBlank(message = "Missing required parameter 'name'")
    @Column(name = "name", nullable = false, length = 255)
    String name;

	@NotBlank(message = "Missing required parameter 'edrpou'")
    @Column(name = "edrpou", nullable = false, unique = true, length = 8)
    String edrpou;

	@NotBlank(message = "Missing required parameter 'region'")
    @Column(name = "region", nullable = false, length = 100)
    String region;

	@NotNull(message = "Missing required parameter 'type'")
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
	SchoolType type;

	@NotNull(message = "Missing required parameter 'isActive'")
    @Column(name = "is_active", nullable = false)
    Boolean isActive = true;

	@CreatedDate
    @Column(name = "created_date", nullable = false, updatable = false)
    Instant createdDate;

}
