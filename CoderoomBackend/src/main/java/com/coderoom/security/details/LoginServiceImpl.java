package com.coderoom.security.details;

import com.coderoom.models.user.User;
import com.coderoom.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * created: 02-04-2021 - 18:30
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Service
public class LoginServiceImpl implements UserDetailsService {

    @Autowired
    private UsersRepository usersRepository;


    @Override
    public UserDetails loadUserByUsername(String nickname) throws UsernameNotFoundException {
        User user = usersRepository.findByNickname(nickname)
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));
        return new UserDetailsImpl(user);
    }
}
