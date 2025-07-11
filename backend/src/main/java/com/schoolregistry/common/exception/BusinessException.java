package com.schoolregistry.common.exception;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@Getter
public class BusinessException extends RuntimeException {

    private final List<Object> args;
    private final String template;

    public BusinessException(String message) {
        super(message);
        this.template = null;
        this.args = null;
        log.warn(message);
    }

    public BusinessException(String message, String template, List<Object> args) {
        super(message);
        this.template = template;
        this.args = args;
        log.warn(message);
    }
} 