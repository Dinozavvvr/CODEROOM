package com.coderoom.models.language.enums;

import lombok.Getter;

/**
 * created: 09-04-2021 - 13:31
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public enum Languages {

    C ("C"),
    CPP ("C++"),
    CS ("C#"),
    CSS ("CSS"),
    COFFEESCRIPT ("CoffeeScript"),
    GO ("Go"),
    GROOVY ("Groovy"),
    HASKELL ("Haskell"),
    HTML ("HTML"),
    HTTP ("HTTP"),
    JAVASCRIPT ("JavaScript"),
    JAVA ("Java"),
    JSON("JSON"),
    KOTLIN("Kotlin"),
    OBJECTIVE_C ("Objective-C"),
    PASCAL ("Pascal"),
    PHP ("PHP"),
    PYTHON ("Python"),
    R ("R"),
    RUBY ("Ruby"),
    RUST ("Rust"),
    SCALA ("Scala"),
    SWIFT ("Swift"),
    XML ("XML"),

    /* SQL */
    CASSANDRA("Cassandra"),
    MYSQL("MySQL"),
    MARIADB("MariaDB"),
    MSSQL("Microsoft SQL Server"),
    POSTGRESQL("PostgreSQL");


    @Getter
    private final String name;

    Languages(String name) {
        this.name = name;
    }

}
