package com.coderoom.services.roles;

import com.coderoom.models.user.Role;
import com.coderoom.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Optional;

/**
 * created: 09-04-2021 - 12:19
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @PostConstruct
    private void init() {
        Optional<Role> role = roleRepository.findByName(Role.Roles.VIEWER);
        if (role.isEmpty()) {
            roleRepository.save(Role.builder().name(Role.Roles.VIEWER).build());
        }
        role = roleRepository.findByName(Role.Roles.USER);
        if (role.isEmpty()) {
            roleRepository.save(Role.builder().name(Role.Roles.USER).build());
        }
        role = roleRepository.findByName(Role.Roles.ADMIN);
        if (role.isEmpty()) {
            roleRepository.save(Role.builder().name(Role.Roles.ADMIN).build());
        }
    }

}
