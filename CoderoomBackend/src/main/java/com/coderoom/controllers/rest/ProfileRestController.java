package com.coderoom.controllers.rest;

import com.coderoom.dto.profile.ProfileDto;
import com.coderoom.security.details.UserDetailsImpl;
import com.coderoom.services.profile.ProfileService;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * created: 09-04-2021 - 13:55
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@JsonSerialize
@RestController
@CrossOrigin(originPatterns = "*")
public class ProfileRestController {

    @Autowired
    private ProfileService profileService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/api/v.1/account")
    public ResponseEntity<ProfileDto> getAccountData(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            ProfileDto profileDto = profileService
                    .getUserProfile(userDetails.getUser().getId());
            return ResponseEntity.ok(profileDto);
        } catch (UsernameNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
