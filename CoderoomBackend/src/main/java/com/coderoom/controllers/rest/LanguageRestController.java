package com.coderoom.controllers.rest;

import com.coderoom.dto.language.LanguageDto;
import com.coderoom.services.languages.LanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.PermitAll;
import java.util.List;

/**
 * created: 04-05-2021 - 23:13
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@RestController
@CrossOrigin(originPatterns = "*")
public class LanguageRestController {

    @Autowired
    private LanguageService languageService;

    @PermitAll
    @GetMapping("/api/v.1/languages/all")
    public ResponseEntity<List<LanguageDto>> getAllLanguages() {
        return ResponseEntity.ok(languageService.getAllLanguages());
    }

}
