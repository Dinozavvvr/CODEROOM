package com.coderoom.repositories;

import com.coderoom.models.language.Language;
import com.coderoom.models.language.enums.Languages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * created: 04-05-2021 - 23:03
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public interface LanguageRepository extends JpaRepository<Language, Integer> {

    List<Language> findAllByOrderByNameAsc();

    Language findByName(Languages name);

}
