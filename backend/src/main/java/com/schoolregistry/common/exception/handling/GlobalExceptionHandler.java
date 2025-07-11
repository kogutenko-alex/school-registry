package com.schoolregistry.common.exception.handling;

import com.schoolregistry.common.exception.BusinessException;
import com.schoolregistry.common.exception.NotFoundException;
import com.schoolregistry.common.util.ErrorUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @Value("${spring.profiles.active:dev}")
    private String activeProfile;

    private boolean isProdEnv() {
        return "prod".equals(activeProfile);
    }

    private String getUnsafeDetails(Throwable exception) {
        return ErrorUtils.getUnsafeDetails(exception, isProdEnv());
    }

    @ExceptionHandler(BusinessException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleBusinessException(BusinessException exception) {
        printError(exception);
        return new ErrorResponse(
                System.currentTimeMillis(),
                HttpStatus.BAD_REQUEST.value(),
                getBusinessErrors(exception)
        );
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFoundException(NotFoundException exception) {
        printError(exception);

        return new ErrorResponse(
                System.currentTimeMillis(),
                HttpStatus.NOT_FOUND.value(),
                List.of(Error.builder()
                        .message(exception.getMessage())
                        .unsafeDetails(getUnsafeDetails(exception))
                        .build())
        );
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMessageNotReadableException(HttpMessageNotReadableException exception) {
        printError(exception);

        return new ErrorResponse(
                System.currentTimeMillis(),
                HttpStatus.BAD_REQUEST.value(),
                List.of(Error.builder()
                        .message("Invalid request format")
                        .unsafeDetails(getUnsafeDetails(exception))
                        .build())
        );
    }

    @ExceptionHandler(BindException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handle(BindException exception) {
        printError(exception);

        return new ErrorResponse(
                System.currentTimeMillis(),
                HttpStatus.BAD_REQUEST.value(),
                exception.getBindingResult().getFieldErrors()
                        .stream()
                        .map(x -> FormValidationError.builder()
                                .field(x.getField())
                                .message(x.getDefaultMessage())
                                .unsafeDetails(getUnsafeDetails(exception))
                                .build())
                        .collect(Collectors.toList())
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handle(MethodArgumentNotValidException exception) {
        printError(exception);

        return new ErrorResponse(
                System.currentTimeMillis(),
                HttpStatus.BAD_REQUEST.value(),
                exception.getBindingResult().getFieldErrors()
                        .stream()
                        .map(x -> FormValidationError.builder()
                                .field(x.getField())
                                .message(x.getDefaultMessage())
                                .unsafeDetails(getUnsafeDetails(exception))
                                .build())
                        .collect(Collectors.toList())
        );
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleDataIntegrityViolationException(DataIntegrityViolationException exception) {
        printError(exception);
        return new ErrorResponse(
                System.currentTimeMillis(),
                HttpStatus.BAD_REQUEST.value(),
                getServerErrors(exception)
        );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleIllegalArgumentException(IllegalArgumentException exception) {
        printError(exception);
        return new ErrorResponse(
                System.currentTimeMillis(),
                HttpStatus.BAD_REQUEST.value(),
                getServerErrors(exception)
        );
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleGenericException(Exception exception) {
        printError(exception);
        return new ErrorResponse(
                System.currentTimeMillis(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                getServerErrors(exception)
        );
    }

    private List<Error> getServerErrors(Throwable ex) {
        return List.of(Error.builder()
                .unsafeDetails(getUnsafeDetails(ex))
                .message(ErrorUtils.getSafeErrorMessage(ex, isProdEnv()))
                .build());
    }

    private List<Error> getBusinessErrors(BusinessException ex) {
        String unsafeDetails = getUnsafeDetails(ex);
        return List.of(Error.builder()
                .unsafeDetails(unsafeDetails)
                .message(ex.getMessage())
                .build());
    }

    private void printError(Throwable exception) {
        if (isProdEnv()) {
            if (exception instanceof BusinessException) {
                log.warn(exception.getMessage());
                return;
            }
            log.error("Error occurred: {}", exception.getClass().getSimpleName());
        } else {
            log.error(exception.getMessage(), exception);
        }
    }
} 