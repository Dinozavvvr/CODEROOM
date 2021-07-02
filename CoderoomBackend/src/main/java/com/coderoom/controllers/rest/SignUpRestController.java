package com.coderoom.controllers.rest;

import com.coderoom.dto.user.UserDto;
import com.coderoom.dto.user.UserSignUpDto;
import com.coderoom.services.auth.SignUpService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.annotation.security.PermitAll;

/**
 * created: 02-04-2021 - 17:06
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Controller
@CrossOrigin(originPatterns = "*")
public class SignUpRestController {

    @Autowired
    private SignUpService signUpService;

    @PermitAll
    @CrossOrigin(originPatterns = "")
    @PostMapping("/api/v.1/registration")
    public ResponseEntity<JSONObject> createUser(@RequestBody UserSignUpDto userDto) {
        JSONObject responseJson = new JSONObject();
        UserDto responseUser = signUpService.signUp(userDto);

        if (responseUser != null) {
            responseJson.put("status", "success");
            return new ResponseEntity<>(responseJson, HttpStatus.OK);
        } else {
            responseJson.put("status", "user already exists");
            return new ResponseEntity<>(responseJson, HttpStatus.BAD_REQUEST);
        }   
    }
}
