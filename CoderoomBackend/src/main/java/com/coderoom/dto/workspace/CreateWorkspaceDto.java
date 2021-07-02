package com.coderoom.dto.workspace;

import com.coderoom.dto.language.LanguageDto;
import lombok.Data;

/**
 * created: 05-05-2021 - 17:03
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Data
public class CreateWorkspaceDto {

    private String title;

    private String description;

    private LanguageDto language;

    private String theme;

}
