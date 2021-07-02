package com.coderoom.dto.user;

import com.coderoom.models.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

/**
 * created: 03-05-2021 - 19:36
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchUserDto {

    private Long id;

    private String email;

    private String nickname;

    private String name;

    private String surname;

    private String image;

    public static SearchUserDto from(User user) {
        return SearchUserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .name(user.getName())
                .surname(user.getSurname())
                .image(user.getAccountData().getProfileImage())
                .build();
    }

    public static List<SearchUserDto> from(List<User> users) {
        return users.stream()
                .map(SearchUserDto::from)
                .collect(Collectors.toList());
    }

}
