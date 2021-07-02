package com.coderoom.services.files;

import com.coderoom.dto.profile.ProfileImageDto;
import com.coderoom.exceptions.FileUploadException;
import com.coderoom.models.user.AccountData;
import com.coderoom.models.user.User;
import com.coderoom.repositories.AccountDataRepository;
import com.coderoom.repositories.UsersRepository;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.UUID;

/**
 * created: 25-04-2021 - 15:29
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Service
public class FilesServiceImpl implements FilesService {

    @Value("${data.profile.profile-image.path}")
    private String PROFILE_IMAGE_DIRECTORY_PATH;

    @Value("${data.profile.profile-image.default-image}")
    private String DEFAULT_PROFILE_IMAGE;

    @Autowired
    private AccountDataRepository accountDataRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public ProfileImageDto saveProfileImage(User user, MultipartFile image) {
        OutputStream outputStream = null;
        try {
            AccountData accountData = user.getAccountData();

            if (accountData.getProfileImage() != null
                    && !accountData.getProfileImage().equals(DEFAULT_PROFILE_IMAGE)) {
                File file = new File(PROFILE_IMAGE_DIRECTORY_PATH
                        + accountData.getProfileImage());
                file.delete();
            }

            String imageName = UUID.randomUUID().toString() + "." +
                            FilenameUtils.getExtension(image.getOriginalFilename());

            File imageFile = new File(PROFILE_IMAGE_DIRECTORY_PATH + imageName);
            outputStream = new FileOutputStream(imageFile);
            outputStream.write(image.getBytes());

            accountData.setProfileImage(imageName);
            accountDataRepository.save(accountData);

            return ProfileImageDto.builder()
                    .image(imageName)
                    .build();
        } catch (IOException e) {
            throw new FileUploadException("profile image upload error");
        } finally {
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (IOException e) {
                    // ignore
                }
            }
        }
    }

    @Override
    public byte[] getImage(String url) {
        File file = new File(PROFILE_IMAGE_DIRECTORY_PATH + url);
        try (InputStream inputStream = new FileInputStream(file)) {
            return inputStream.readAllBytes();
        } catch (IOException e) {
            throw new FileUploadException("image not found");
        }
    }

}
