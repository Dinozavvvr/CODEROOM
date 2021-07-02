package com.coderoom.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * created: 02-04-2021 - 17:24
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSignUpDto {

    private String email;

    private String nickname;

    private String password;

    private String name;

    private String surname;

}
