package com.coderoom.services.users;

import com.coderoom.dto.user.SearchUserDto;
import com.coderoom.dto.user.UserDto;
import com.coderoom.models.user.User;

import java.util.List;

/**
 * created: 02-04-2021 - 16:47
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public interface UsersService {

    List<UserDto> getAllUsers();

    List<UserDto> getAllBannedUsers();

    List<UserDto> getAllActiveUsers();

    User getUserByNickname(String nickname);

    UserDto banUserById(Long id);

    UserDto unbanUser(Long id);

    void banAll();

    void unbanAll();

    List<SearchUserDto> searchUsersByNickname(String nickname,
                                              Integer countOnPage,
                                              Integer page);
    UserDto getUser(Long id);
}
