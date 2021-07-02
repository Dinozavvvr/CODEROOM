package com.coderoom.services.files;

import com.coderoom.dto.profile.ProfileImageDto;
import com.coderoom.models.user.User;
import org.springframework.web.multipart.MultipartFile;

/**
 * created: 25-04-2021 - 15:28
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public interface FilesService {

    ProfileImageDto saveProfileImage(User user, MultipartFile image);

    byte[] getImage(String url);
}
