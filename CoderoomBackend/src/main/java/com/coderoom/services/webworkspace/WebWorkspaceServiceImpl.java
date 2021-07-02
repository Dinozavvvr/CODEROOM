package com.coderoom.services.webworkspace;

import com.coderoom.dto.webworkspace.CreateWebWorkspaceDto;
import com.coderoom.dto.webworkspace.WebWorkspaceDto;
import com.coderoom.exceptions.WebWorkspaceNotFoundException;
import com.coderoom.exceptions.WorkspaceNotFoundException;
import com.coderoom.models.user.User;
import com.coderoom.models.webworkspace.WebWorkspace;
import com.coderoom.models.workspace.Workspace;
import com.coderoom.models.workspace.enums.Theme;
import com.coderoom.repositories.UsersRepository;
import com.coderoom.repositories.WebWorkspaceRepository;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * created: 21-05-2021 - 18:17
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Component
public class WebWorkspaceServiceImpl implements WebWorkspaceService {

    private final WebWorkspaceRepository webWorkspaceRepository;

    private final UsersRepository usersRepository;

    public WebWorkspaceServiceImpl(WebWorkspaceRepository webWorkspaceRepository,
                                   UsersRepository usersRepository) {
        this.webWorkspaceRepository = webWorkspaceRepository;
        this.usersRepository = usersRepository;
    }

    @Override
    public WebWorkspaceDto create(CreateWebWorkspaceDto createWorkspaceDto,
                                  User user) {
        User usr = usersRepository.findById(user.getId()).get();

        WebWorkspace webWorkspace = WebWorkspace.builder()
                .user(usr)
                .title(createWorkspaceDto.getTitle())
                .description(createWorkspaceDto.getDescription())
                .theme(Theme.valueOf(createWorkspaceDto.getTheme()))
                .build();

        return WebWorkspaceDto
                .from(webWorkspaceRepository.saveAndFlush(webWorkspace));
    }

    @Override
    public WebWorkspaceDto getWebWorkspace(Long id) {
        return WebWorkspaceDto.from(webWorkspaceRepository.findById(id)
                .orElseThrow(WebWorkspaceNotFoundException::new));
    }

    @Override
    public void deleteWorkspace(Long id) {
        if (webWorkspaceRepository.existsById(id)) {
            webWorkspaceRepository.deleteById(id);
        } else {
            throw new WebWorkspaceNotFoundException();
        }
    }

    @Override
    public void updateWorkspace(WebWorkspaceDto webWorkspaceDto) {
        WebWorkspace webWorkspace = webWorkspaceRepository.findById(webWorkspaceDto.getId())
                .orElseThrow(WorkspaceNotFoundException::new);

        webWorkspace.setTitle(webWorkspaceDto.getTitle());
        webWorkspace.setDescription(webWorkspaceDto.getDescription());
        webWorkspace.setTheme(Theme.valueOf(webWorkspaceDto.getTheme()));
        webWorkspace.setHtmlCode(webWorkspaceDto.getHtmlCode());
        webWorkspace.setCssCode(webWorkspaceDto.getCssCode());
        webWorkspace.setJsCode(webWorkspaceDto.getJsCode());

        webWorkspaceRepository.save(webWorkspace);
    }

    @Override
    public List<WebWorkspaceDto> getWorkspacesByUserId(Long userId) {
        return WebWorkspaceDto
                .from(webWorkspaceRepository.findAllByUserId(userId));
    }
}
