package com.coderoom.controllers.rest;

import net.minidev.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * created: 07-04-2021 - 21:16
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */

@RestController
@CrossOrigin(origins = "*")
public class AdminRestController {

    @GetMapping("/api/v.1/admin")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<JSONObject> getAdminPage() {
        JSONObject response = new JSONObject();
        response.put("status", "you were authenticated");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/v.1/admin/users")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<JSONObject> getUsersAdminPage() {
        JSONObject response = new JSONObject();
        response.put("status", "you were authenticated");
        return ResponseEntity.ok(response);
    }

}
