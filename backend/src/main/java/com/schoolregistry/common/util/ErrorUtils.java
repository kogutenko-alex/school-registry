package com.schoolregistry.common.util;

public class ErrorUtils {

    public static String getUnsafeDetails(Throwable exception, boolean isProdEnv) {
        if (isProdEnv) {
            return null;
        }
        return exception.getClass().getSimpleName() + ": " + exception.getMessage();
    }

    public static String getSafeErrorMessage(Throwable exception, boolean isProdEnv) {
        if (isProdEnv) {
            return "Internal server error occurred";
        }
        return exception.getMessage();
    }
}