package com.coderoom.models.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * created: 25-04-2021 - 15:30
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class AccountData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "accountData")
    private User user;

    private String profileImage;

    private String headerImage;

}
