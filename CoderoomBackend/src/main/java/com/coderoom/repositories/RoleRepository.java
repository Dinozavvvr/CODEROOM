package com.coderoom.repositories;

import com.coderoom.models.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * created: 09-04-2021 - 12:18
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByName(Role.Roles name);

}
