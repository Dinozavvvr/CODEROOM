package com.coderoom.controllers.rest;

import com.coderoom.dto.webworkspace.CreateWebWorkspaceDto;
import com.coderoom.dto.webworkspace.WebWorkspaceDto;
import com.coderoom.exceptions.WebWorkspaceNotFoundException;
import com.coderoom.security.details.UserDetailsImpl;
import com.coderoom.services.webworkspace.WebWorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * created: 21-05-2021 - 17:56
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */

@RestController
@CrossOrigin(originPatterns = "*")
public class WebWorkspaceRestController {

    @Autowired
    private WebWorkspaceService webWorkspaceService;

    @PostMapping("/api/v.1/web-workspace/create")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<WebWorkspaceDto> create(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody CreateWebWorkspaceDto dto) {
        return ResponseEntity.ok(webWorkspaceService.create(dto, userDetails.getUser()));
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/api/v.1/web-workspace/{id}")
    public ResponseEntity<?> getWebWorkspace(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(webWorkspaceService.getWebWorkspace(id));
        } catch (WebWorkspaceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('USER')")
    @DeleteMapping("/api/v.1/web-workspace/delete")
    public ResponseEntity<?> deleteWebWorkspace(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody WebWorkspaceDto webWorkspaceDto) {
        try {
            if (userDetails.getUser().getId()
                    .equals(webWorkspaceDto.getUser().getId())) {
                webWorkspaceService.deleteWorkspace(webWorkspaceDto.getId());
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        } catch (WebWorkspaceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('USER')")
    @PutMapping("/api/v.1/web-workspace/update")
    public ResponseEntity<?> saveWebWorkspace(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody WebWorkspaceDto webWorkspaceDto) {
        try {
            if (userDetails.getUser().getId()
                    .equals(webWorkspaceDto.getUser().getId())) {
                webWorkspaceService.updateWorkspace(webWorkspaceDto);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        } catch (WebWorkspaceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/api/v.1/web-workspace/all/user/{userId}")
    public ResponseEntity<List<WebWorkspaceDto>> getAllUserWebWorkspaces(
            @PathVariable Long userId) {
        return ResponseEntity.ok(webWorkspaceService.getWorkspacesByUserId(userId));
    }

}
