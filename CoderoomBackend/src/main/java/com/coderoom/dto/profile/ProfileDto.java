package com.coderoom.dto.profile;

import com.coderoom.dto.room.SimpleRoomDto;
import com.coderoom.dto.user.RoleDto;
import com.coderoom.dto.webworkspace.WebWorkspaceDto;
import com.coderoom.dto.workspace.WorkspaceDto;
import com.coderoom.models.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * created: 09-04-2021 - 12:35
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {

    private String nickname;

    private String name;

    private String surname;

    private User.Status status;

    private String image;

    private List<RoleDto> roles;

    private List<SimpleRoomDto> rooms;

    private List<WorkspaceDto> workspaces;

    private List<WebWorkspaceDto> webWorkspaces;

    public static ProfileDto from(User user) {
        return ProfileDto.builder()
                .nickname(user.getNickname())
                .name(user.getName())
                .surname(user.getSurname())
                .roles(RoleDto.from(user.getRoles()))
                .status(user.getStatus())
                .rooms(SimpleRoomDto.from(user.getRooms()))
                .workspaces(WorkspaceDto.from(user.getWorkspaces()))
                .image(user.getAccountData().getProfileImage())
                .webWorkspaces(WebWorkspaceDto.from(user.getWebWorkspaces()))
                .build();
    }
}
