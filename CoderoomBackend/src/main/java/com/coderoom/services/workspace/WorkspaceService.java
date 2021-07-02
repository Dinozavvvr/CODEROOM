package com.coderoom.services.workspace;

import com.coderoom.dto.workspace.CreateWorkspaceDto;
import com.coderoom.dto.workspace.WorkspaceDto;
import com.coderoom.models.user.User;

import java.util.List;

/**
 * created: 05-05-2021 - 17:45
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public interface WorkspaceService {

    WorkspaceDto create(CreateWorkspaceDto workspaceDto, User user);

    WorkspaceDto getWorkspace(Long id);

    List<WorkspaceDto> getWorkspaces();

    List<WorkspaceDto> getWorkspacesByUserId(Long userId);

    void deleteWorkspace(Long id);

    void updateWorkspace(WorkspaceDto id);

}
