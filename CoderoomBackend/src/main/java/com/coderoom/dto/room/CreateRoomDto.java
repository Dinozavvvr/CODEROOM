package com.coderoom.dto.room;

import com.coderoom.dto.language.LanguageDto;
import com.coderoom.dto.user.UserDto;
import com.coderoom.dto.workspace.WorkspaceDto;
import lombok.Data;

import java.util.List;

/**
 * created: 07-05-2021 - 23:13
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Data
public class CreateRoomDto {

    private String title;

    private String description;

    private String access;

    private List<LanguageDto> languages;

    private List<UserDto> contributors;

    private List<WorkspaceDto> workspaces;

}
