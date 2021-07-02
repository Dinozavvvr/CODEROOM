package com.coderoom.dto.user;

import com.coderoom.models.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

/**
 * created: 06-05-2021 - 18:16
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserLiteDto {

    private Long id;

    private String email;

    private String nickname;

    private String name;

    private String surname;

    private String image;

    public static UserDto from(User user) {
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .name(user.getName())
                .surname(user.getSurname())
                .image(user.getAccountData().getProfileImage())
                .state(user.getState())
                .roles(RoleDto.from(user.getRoles()))
                .build();
    }

    public static List<UserDto> from(List<User> users) {
        return users.stream().map(UserDto::from).collect(Collectors.toList());
    }

}
