package com.schoolregistry.common.exception;

import java.util.List;

public class NotFoundException extends BusinessException {

    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(String message, String template, List<Object> args) {
        super(message, template, args);
    }
} 