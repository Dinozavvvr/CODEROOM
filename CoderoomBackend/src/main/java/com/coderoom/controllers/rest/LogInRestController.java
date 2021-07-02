package com.coderoom.controllers.rest;

import com.coderoom.dto.user.UserLogInDto;
import com.coderoom.jwt.JwtTokenProvider;
import com.coderoom.services.users.UsersService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.PermitAll;

/**
 * created: 02-04-2021 - 17:04
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@RestController
public class LogInRestController {

    @Autowired
    private UsersService usersService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PermitAll
    @CrossOrigin(originPatterns = "*")
    @PostMapping("/api/v.1/login")
    public ResponseEntity<JSONObject> login(@RequestBody UserLogInDto loginDto) {
        try {
            final Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getNickname(),
                            loginDto.getPassword())
            );

            String token = jwtTokenProvider.generateToken(authentication);

            JSONObject response = new JSONObject();
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (UsernameNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
