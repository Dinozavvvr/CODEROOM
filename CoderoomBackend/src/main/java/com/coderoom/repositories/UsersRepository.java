package com.coderoom.repositories;

import com.coderoom.models.user.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * created: 02-04-2021 - 16:38
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public interface UsersRepository extends JpaRepository<User, Long> {

    Optional<User> findByNickname(String nickname);

    List<User> findAllByState(User.State state);

    List<User> findAllByNicknameStartsWithIgnoreCaseOrderByNicknameAsc(String nickname, Pageable pageable);
}
