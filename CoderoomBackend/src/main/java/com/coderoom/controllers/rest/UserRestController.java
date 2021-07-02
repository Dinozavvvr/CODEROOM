package com.coderoom.controllers.rest;

import com.coderoom.dto.user.SearchUserDto;
import com.coderoom.dto.user.UserDto;
import com.coderoom.exceptions.NotEnoughAuthoritiesToBanException;
import com.coderoom.exceptions.UserAlreadyActiveException;
import com.coderoom.exceptions.UserAlreadyBannedException;
import com.coderoom.security.details.UserDetailsImpl;
import com.coderoom.services.users.UsersService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import java.util.List;

/**
 * created: 02-04-2021 - 16:42
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@RestController
@CrossOrigin(originPatterns = "*")
public class UserRestController {

    @Autowired
    private UsersService usersService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/api/v.1/users/me")
    public ResponseEntity<?> getUser(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            return ResponseEntity.ok(usersService.getUser(userDetails.getUser().getId()));
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/api/v.1/users")
    public ResponseEntity<List<UserDto>> getUsers() {
        return ResponseEntity.ok(usersService.getAllUsers());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/api/v.1/users/active")
    public ResponseEntity<List<UserDto>> getActiveUsers(@RequestParam boolean sorted) {
        return ResponseEntity.ok(usersService.getAllActiveUsers());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/api/v.1/users/banned")
    public ResponseEntity<List<UserDto>> getBannedUsers(@RequestParam boolean sorted) {
        return ResponseEntity.ok(usersService.getAllActiveUsers()   );
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/api/v.1/users/{id}/ban")
    public ResponseEntity<?> banUser(@PathVariable(name = "id") Long id) {
        try {
            UserDto bannedUser = usersService.banUserById(id);
            return ResponseEntity.ok(bannedUser);
        } catch (UsernameNotFoundException |
                NotEnoughAuthoritiesToBanException |
                UserAlreadyBannedException e) {

            JSONObject errorResponse = new JSONObject();
            errorResponse.put("status", e.getMessage());

            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/api/v.1/users/{id}/unban")
    public ResponseEntity<?> unbanUser(@PathVariable(name = "id") Long id) {
        try {
            UserDto unbannedUser = usersService.unbanUser(id);
            return ResponseEntity.ok(unbannedUser);
        } catch (UsernameNotFoundException |
                UserAlreadyActiveException e) {

            JSONObject errorResponse = new JSONObject();
            errorResponse.put("status", e.getMessage());

            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/api/v.1/users/all/ban")
    public ResponseEntity<?> banAllUsers() {
        usersService.banAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/api/v.1/users/all/unban")
    public ResponseEntity<?> unbanAllUsers() {
        usersService.unbanAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /*
     не хорошо наверное делать PermitAll все таки это api
     TODO: исправить
    * */
    @PermitAll
    @GetMapping("/api/v.1/users/search/{page}/{countOnPage}/{nickname}")
    public ResponseEntity<List<SearchUserDto>> searchUsersByNickname(
            @PathVariable String nickname,
            @PathVariable Integer page,
            @PathVariable Integer countOnPage) {
        return ResponseEntity.ok(usersService
                .searchUsersByNickname(nickname, page, countOnPage));
    }

}
