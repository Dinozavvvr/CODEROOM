package com.coderoom.dto.language;

import com.coderoom.models.language.Language;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

/**
 * created: 09-04-2021 - 14:13
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LanguageDto {

    private Integer id;

    private String name;

    private String type;

    public static LanguageDto from(Language language) {
        return LanguageDto.builder()
                .id(language.getId())
                .name(language.getName().getName())
                .type(language.getType())
                .build();
    }

    public static List<LanguageDto> from(List<Language> languages) {
        return languages.stream().map(LanguageDto::from)
                .collect(Collectors.toList());
    }
}
