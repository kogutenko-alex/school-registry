package com.schoolregistry.common.exception.handling;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder(toBuilder = true)
@RequiredArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PROTECTED)
public class Error {

    @JsonProperty(required = true)
    String message;

    String unsafeDetails;

}
