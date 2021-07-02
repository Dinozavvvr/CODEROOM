package com.coderoom.services.room;

import com.coderoom.dto.room.CreateRoomDto;
import com.coderoom.dto.room.RoomDto;
import com.coderoom.exceptions.LanguageNotFoundException;
import com.coderoom.exceptions.RoomNotFoundException;
import com.coderoom.exceptions.UserNotFoundException;
import com.coderoom.exceptions.WorkspaceNotFoundException;
import com.coderoom.models.room.Room;
import com.coderoom.models.user.User;
import com.coderoom.models.language.Language;
import com.coderoom.models.workspace.Workspace;
import com.coderoom.repositories.LanguageRepository;
import com.coderoom.repositories.RoomRepository;
import com.coderoom.repositories.UsersRepository;
import com.coderoom.repositories.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * created: 07-05-2021 - 23:34
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private LanguageRepository languageRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private WorkspaceRepository workspaceRepository;

    @Override
    public RoomDto create(CreateRoomDto createRoomDto) {
        Room room = Room.builder()
                .title(createRoomDto.getTitle())
                .description(createRoomDto.getDescription())
                .access(Room.Access.valueOf(createRoomDto.getAccess()))
                .languages(new ArrayList<>())
                .workspaces(new ArrayList<>())
                .contributors(new ArrayList<>())
                .build();

        createRoomDto.getLanguages().forEach(languageDto -> {
            Language language = languageRepository.findById(languageDto.getId())
                    .orElseThrow(LanguageNotFoundException::new);
            language.getRooms().add(room);
            room.getLanguages().add(language);
        });

        createRoomDto.getWorkspaces().forEach(workspaceDto -> {
            Workspace workspace = workspaceRepository.findById(workspaceDto.getId())
                    .orElseThrow(WorkspaceNotFoundException::new);
            workspace.getRooms().add(room);
            room.getWorkspaces().add(workspace);
        });

        createRoomDto.getContributors().forEach(userDto -> {
            User user = usersRepository.findById(userDto.getId())
                    .orElseThrow(UserNotFoundException::new);
            user.getRooms().add(room);
            room.getContributors().add(user);
        });

        return RoomDto.from(roomRepository.saveAndFlush(room));
    }

    @Override
    public RoomDto getRoomById(Long id) {
        return RoomDto.from(roomRepository.findById(id)
                .orElseThrow(RoomNotFoundException::new));
    }
}
