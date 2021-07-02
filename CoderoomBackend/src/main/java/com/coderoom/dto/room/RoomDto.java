package com.coderoom.dto.room;

import com.coderoom.dto.language.LanguageDto;
import com.coderoom.dto.user.UserDto;
import com.coderoom.dto.workspace.WorkspaceDto;
import com.coderoom.models.room.Room;
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
public class RoomDto {

    private String title;

    private String description;

    private String access;

    private List<LanguageDto> languages;

    private List<WorkspaceDto> workspaces;

    private List<UserDto> contributors;

    public static RoomDto from(Room room) {
        return RoomDto.builder()
                .title(room.getTitle())
                .description(room.getDescription())
                .languages(LanguageDto.from(room.getLanguages()))
                .contributors(UserDto.from(room.getContributors()))
                .workspaces(WorkspaceDto.from(room.getWorkspaces()))
                .access(room.getAccess().name())
                .build();
    }

    public static List<RoomDto> from(List<Room> rooms) {
        return rooms.stream().map(RoomDto::from)
                .collect(Collectors.toList());
    }

}
