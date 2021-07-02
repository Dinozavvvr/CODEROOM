package com.coderoom.services.profile;

import com.coderoom.dto.profile.ProfileDto;

/**
 * created: 09-04-2021 - 14:00
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public interface ProfileService {
    ProfileDto getUserProfile(Long userId);
}
