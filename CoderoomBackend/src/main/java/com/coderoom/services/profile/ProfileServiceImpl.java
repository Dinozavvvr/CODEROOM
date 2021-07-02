package com.coderoom.services.profile;

import com.coderoom.dto.profile.ProfileDto;
import com.coderoom.models.user.User;
import com.coderoom.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * created: 09-04-2021 - 14:00
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public ProfileDto getUserProfile(Long userId) {
        User user = usersRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("user by id not found"));

        return ProfileDto.from(user);
    }
}
