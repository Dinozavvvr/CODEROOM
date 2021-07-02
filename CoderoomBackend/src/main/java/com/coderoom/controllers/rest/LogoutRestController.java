package com.coderoom.controllers.rest;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * created: 07-04-2021 - 18:52
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */

@RestController
@CrossOrigin(origins = "*")
public class LogoutRestController {

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/api/v.1/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        SecurityContextLogoutHandler securityContextLogoutHandler
                = new SecurityContextLogoutHandler();
        securityContextLogoutHandler.logout(request, response, null);
    }

}

