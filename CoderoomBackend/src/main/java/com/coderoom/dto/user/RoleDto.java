package com.coderoom.dto.user;

import com.coderoom.models.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

/**
 * created: 09-04-2021 - 15:22
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto {

    private String name;

    public static RoleDto from(Role role) {
        return RoleDto.builder()
                .name(role.getName().toString())
                .build();
    }

    public static List<RoleDto> from(List<Role> roles) {
        return roles.stream().map(RoleDto::from)
                .collect(Collectors.toList());
    }
}
