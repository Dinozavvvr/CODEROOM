package com.coderoom.dto.webworkspace;

import com.coderoom.dto.user.UserDto;
import com.coderoom.models.webworkspace.WebWorkspace;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

/**
 * created: 21-05-2021 - 18:00
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WebWorkspaceDto {

    private Long id;

    private String title;

    private String description;

    private String theme;

    private String htmlCode;

    private String cssCode;

    private String jsCode;

    private UserDto user;

    public static WebWorkspaceDto from(WebWorkspace webWorkspace) {
        return WebWorkspaceDto.builder()
                .id(webWorkspace.getId())
                .title(webWorkspace.getTitle())
                .description(webWorkspace.getDescription())
                .theme(webWorkspace.getTheme().name())
                .htmlCode(webWorkspace.getHtmlCode())
                .cssCode(webWorkspace.getCssCode())
                .jsCode(webWorkspace.getJsCode())
                .user(UserDto.from(webWorkspace.getUser()))
                .build();
    }

    public static List<WebWorkspaceDto> from(List<WebWorkspace> webWorkspace) {
        return webWorkspace.stream().map(WebWorkspaceDto::from)
                .collect(Collectors.toList());
    }
}
