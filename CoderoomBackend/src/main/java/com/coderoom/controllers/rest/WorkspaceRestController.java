package com.coderoom.controllers.rest;

import com.coderoom.dto.workspace.CreateWorkspaceDto;
import com.coderoom.dto.workspace.WorkspaceDto;
import com.coderoom.exceptions.WorkspaceNotFoundException;
import com.coderoom.security.details.UserDetailsImpl;
import com.coderoom.services.workspace.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import java.util.List;

/**
 * created: 05-05-2021 - 16:54
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */


@RestController
@CrossOrigin(originPatterns = "*")
public class WorkspaceRestController {

    @Autowired
    private WorkspaceService workspaceService;

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/api/v.1/workspace/initializer")
    public ResponseEntity<?> getWorkspaceInitializePage() {
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/api/v.1/workspace/create")
    public ResponseEntity<WorkspaceDto> createWorkspace(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody CreateWorkspaceDto dto) {
        return ResponseEntity.ok(workspaceService.create(dto, userDetails.getUser()));
    }

    @PreAuthorize("hasAuthority('USER')")
    @DeleteMapping("/api/v.1/workspace/delete")
    public ResponseEntity<?> deleteWorkspace(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody WorkspaceDto workspaceDto) {
        try {
            if (userDetails.getUser().getId()
                    .equals(workspaceDto.getUser().getId())) {
                workspaceService.deleteWorkspace(workspaceDto.getId());
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        } catch (WorkspaceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('USER')")
    @PutMapping("/api/v.1/workspace/update")
    public ResponseEntity<?> saveWorkspace(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody WorkspaceDto workspaceDto) {
        try {
            if (userDetails.getUser().getId()
                    .equals(workspaceDto.getUser().getId())) {
                workspaceService.updateWorkspace(workspaceDto);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        } catch (WorkspaceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }



    @PreAuthorize("isAuthenticated()")
    @GetMapping("/api/v.1/workspace/{id}")
    public ResponseEntity<?> getWorkspace(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(workspaceService.getWorkspace(id));
        } catch (WorkspaceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PermitAll
    @GetMapping("/api/v.1/workspace/all")
    public ResponseEntity<List<WorkspaceDto>> getAllWorkspaces() {
        return ResponseEntity.ok(workspaceService.getWorkspaces());
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/api/v.1/workspace/all/user/{userId}")
    public ResponseEntity<List<WorkspaceDto>> getAllUserWorkspaces(
            @PathVariable Long userId) {
        return ResponseEntity.ok(workspaceService.getWorkspacesByUserId(userId));
    }

}
