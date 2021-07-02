package com.coderoom.services.webworkspace;

import com.coderoom.dto.webworkspace.CreateWebWorkspaceDto;
import com.coderoom.dto.webworkspace.WebWorkspaceDto;
import com.coderoom.models.user.User;

import java.util.List;

/**
 * created: 21-05-2021 - 18:16
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public interface WebWorkspaceService {

    WebWorkspaceDto create(CreateWebWorkspaceDto createWorkspaceDto, User user);

    WebWorkspaceDto getWebWorkspace(Long id);

    void deleteWorkspace(Long id);

    void updateWorkspace(WebWorkspaceDto webWorkspaceDto);

    List<WebWorkspaceDto> getWorkspacesByUserId(Long userId);
}
