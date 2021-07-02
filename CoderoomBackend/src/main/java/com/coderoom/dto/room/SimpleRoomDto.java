package com.coderoom.dto.room;

import com.coderoom.dto.language.LanguageDto;
import com.coderoom.models.room.Room;
import com.coderoom.models.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

/**
 * created: 09-04-2021 - 14:36
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SimpleRoomDto {

    private Long id;

    private List<String> contributors;

    private List<LanguageDto> languages;

    private String title;

    private String description;

    public static SimpleRoomDto from(Room room) {
        return SimpleRoomDto.builder()
                .id(room.getId())
                .title(room.getTitle())
                .description(room.getDescription())
                .contributors(room.getContributors().stream()
                        .map(User::getNickname)
                        .collect(Collectors.toList()))
                .languages(LanguageDto.from(room.getLanguages()))
                .build();
    }

    public static List<SimpleRoomDto> from(List<Room> rooms) {
        return rooms.stream().map(SimpleRoomDto::from)
                .collect(Collectors.toList());
    }
}
