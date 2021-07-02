package com.coderoom.services.workspace;

import com.coderoom.dto.workspace.CreateWorkspaceDto;
import com.coderoom.dto.workspace.WorkspaceDto;
import com.coderoom.exceptions.LanguageNotFoundException;
import com.coderoom.exceptions.WorkspaceNotFoundException;
import com.coderoom.models.user.User;
import com.coderoom.models.language.Language;
import com.coderoom.models.workspace.Workspace;
import com.coderoom.models.workspace.enums.Theme;
import com.coderoom.repositories.LanguageRepository;
import com.coderoom.repositories.UsersRepository;
import com.coderoom.repositories.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * created: 05-05-2021 - 17:46
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */

@Service
public class WorkspaceServiceImpl implements WorkspaceService {

    @Autowired
    private WorkspaceRepository workspaceRepository;

    @Autowired
    private LanguageRepository languageRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public WorkspaceDto create(CreateWorkspaceDto workspaceDto, User user) {
        Language language = languageRepository
                .findById(workspaceDto.getLanguage().getId())
                .orElseThrow(LanguageNotFoundException::new);

        User usr = usersRepository.findById(user.getId()).get();

        Workspace workspace = Workspace.builder()
                .title(workspaceDto.getTitle())
                .description(workspaceDto.getDescription())
                .theme(Theme.valueOf(workspaceDto.getTheme()))
                .language(language)
                .user(usr)
                .code("")
                .build();

        language.getWorkspaces().add(workspace);

        return WorkspaceDto.from(workspaceRepository.saveAndFlush(workspace));
    }

    @Override
    public WorkspaceDto getWorkspace(Long id) {
        return WorkspaceDto.from(workspaceRepository.findById(id)
                .orElseThrow(WorkspaceNotFoundException::new));
    }

    @Override
    public void deleteWorkspace(Long id) {
        if (workspaceRepository.existsById(id)) {
            workspaceRepository.deleteById(id);
        } else {
            throw new WorkspaceNotFoundException();
        }
    }

    @Override
    public void updateWorkspace(WorkspaceDto workspaceDto) {
        Workspace workspace = workspaceRepository.findById(workspaceDto.getId())
                .orElseThrow(WorkspaceNotFoundException::new);

        workspace.setTitle(workspaceDto.getTitle());
        workspace.setDescription(workspaceDto.getDescription());
        workspace.setTheme(Theme.valueOf(workspaceDto.getTheme()));
        workspace.setCode(workspaceDto.getCode());

        workspaceRepository.save(workspace);
    }

    @Override
    public List<WorkspaceDto> getWorkspaces() {
        return WorkspaceDto.from(workspaceRepository.findAll());
    }

    @Override
    public List<WorkspaceDto> getWorkspacesByUserId(Long userId) {
        return WorkspaceDto.from(workspaceRepository.findAllByUserId(userId));
    }

}
