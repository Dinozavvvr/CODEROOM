package com.coderoom.services.languages;

import com.coderoom.dto.language.LanguageDto;

import java.util.List;

/**
 * created: 04-05-2021 - 23:06
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public interface LanguageService {

    List<LanguageDto> getAllLanguages();

}
