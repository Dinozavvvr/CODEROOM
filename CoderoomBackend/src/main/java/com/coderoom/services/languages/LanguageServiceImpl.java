package com.coderoom.services.languages;

import com.coderoom.dto.language.LanguageDto;
import com.coderoom.repositories.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * created: 04-05-2021 - 23:08
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Service
public class LanguageServiceImpl implements LanguageService {

    @Autowired
    private LanguageRepository languageRepository;

    @Override
    public List<LanguageDto> getAllLanguages() {
        return LanguageDto.from(languageRepository.findAllByOrderByNameAsc());
    }
}
