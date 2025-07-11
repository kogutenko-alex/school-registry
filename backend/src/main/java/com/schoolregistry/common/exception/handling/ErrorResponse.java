package com.schoolregistry.common.exception.handling;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

import static lombok.AccessLevel.PRIVATE;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class ErrorResponse {

    @JsonProperty(required = true)
    Long timestamp;

    @JsonProperty(required = true)
    Integer status;

    @JsonProperty(required = true)
    List<Error> errors;
}
