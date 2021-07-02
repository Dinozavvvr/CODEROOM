package com.coderoom.controllers.rest;

import com.coderoom.dto.room.CreateRoomDto;
import com.coderoom.exceptions.LanguageNotFoundException;
import com.coderoom.exceptions.RoomNotFoundException;
import com.coderoom.exceptions.UserNotFoundException;
import com.coderoom.exceptions.WorkspaceNotFoundException;
import com.coderoom.services.room.RoomService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;

/**
 * created: 07-05-2021 - 21:58
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@RestController
@CrossOrigin(originPatterns = "*")
public class RoomRestController {

    @Autowired
    private RoomService roomService;

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/api/v.1/room/initializer")
    public ResponseEntity<?> getRoomInitializePage() {
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/api/v.1/room/create")
    public ResponseEntity<?> createRoom(@RequestBody CreateRoomDto dto) {
        try {
            return ResponseEntity.ok(roomService.create(dto));
        } catch (LanguageNotFoundException
                | WorkspaceNotFoundException
                | UserNotFoundException e) {
            JSONObject response = new JSONObject();
            response.put("status", e.getMessage());
            System.out.println(e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @PermitAll
    @GetMapping("/api/v.1/room/{id}")
    public ResponseEntity<?> getRoom(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(roomService.getRoomById(id));
        } catch (RoomNotFoundException e) {
            JSONObject response = new JSONObject();
            response.put("status", e.getMessage());
            System.out.println(e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/api/v.1/room/all/user/{userId}")
    public ResponseEntity<?> getAllUserRooms(@PathVariable Long userId) {
        return null;
    }

}
