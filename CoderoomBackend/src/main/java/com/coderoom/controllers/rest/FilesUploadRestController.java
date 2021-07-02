package com.coderoom.controllers.rest;

import com.coderoom.dto.profile.ProfileImageDto;
import com.coderoom.exceptions.FileUploadException;
import com.coderoom.models.user.User;
import com.coderoom.security.details.UserDetailsImpl;
import com.coderoom.services.files.FilesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * created: 25-04-2021 - 15:29
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@RestController
@CrossOrigin(originPatterns = "*")
public class FilesUploadRestController {

    @Autowired
    private FilesService filesService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/api/v.1/upload/account/image")
    public ResponseEntity<?> uploadAccountImage(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestParam("image") MultipartFile image) {
        try {
            User user = userDetails.getUser();
            ProfileImageDto imageDto = filesService.saveProfileImage(user, image);

            return ResponseEntity.ok(imageDto);
        } catch (FileUploadException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
