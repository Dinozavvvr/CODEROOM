package com.coderoom.dto.webworkspace;

import lombok.Data;

/**
 * created: 21-05-2021 - 18:00
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Data
public class CreateWebWorkspaceDto {

    private String title;

    private String description;

    private String theme;

}
