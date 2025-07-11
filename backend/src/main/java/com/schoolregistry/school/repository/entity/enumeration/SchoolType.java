package com.schoolregistry.school.repository.entity.enumeration;

import lombok.Getter;

@Getter
public enum SchoolType {
    GYMNASIUM("Гімназія"),
    LYCEUM("Ліцей"),
    GENERAL_SECONDARY_SCHOOL("ЗЗСО");

    private final String displayName;

    SchoolType(String displayName) {
        this.displayName = displayName;
    }

}
