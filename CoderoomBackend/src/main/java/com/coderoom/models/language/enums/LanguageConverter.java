package com.coderoom.models.language.enums;

import org.springframework.data.convert.ReadingConverter;
import org.springframework.data.convert.WritingConverter;
import org.springframework.stereotype.Service;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

/**
 * created: 04-05-2021 - 23:22
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Converter(autoApply = true)
public class LanguageConverter implements AttributeConverter<Languages, String> {

    @Override
    public String convertToDatabaseColumn(Languages language) {
        return language != null ? language.getName() : null;
    }

    @Override
    public Languages convertToEntityAttribute(String name) {
        if (name == null) {
            return null;
        } else {
            return Stream.of(Languages.values())
                    .filter(language -> language.getName().equals(name))
                    .findFirst()
                    .orElseThrow(IllegalArgumentException::new);
        }
    }

}
