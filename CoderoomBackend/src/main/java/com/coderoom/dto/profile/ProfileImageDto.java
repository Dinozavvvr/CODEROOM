package com.coderoom.dto.profile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * created: 25-04-2021 - 16:21
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileImageDto {

    private String image;

}
