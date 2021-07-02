package com.coderoom.dto.workspace;

import com.coderoom.dto.language.LanguageDto;
import com.coderoom.dto.user.UserDto;
import com.coderoom.models.workspace.Workspace;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

/**
 * created: 09-04-2021 - 14:06
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkspaceDto {

    private Long id;

    private UserDto user;

    private LanguageDto language;

    private String title;

    private String description;

    private String code;

    private String theme;

    public static WorkspaceDto from(Workspace workspace) {
        return WorkspaceDto.builder()
                .id(workspace.getId())
                .user(UserDto.from(workspace.getUser()))
                .language(LanguageDto.from(workspace.getLanguage()))
                .title(workspace.getTitle())
                .description(workspace.getDescription())
                .code(workspace.getCode())
                .theme(workspace.getTheme().name())
                .build();
    }

    public static List<WorkspaceDto> from(List<Workspace> workspaces) {
        return workspaces.stream().map(WorkspaceDto::from)
                .collect(Collectors.toList());
    }
}
