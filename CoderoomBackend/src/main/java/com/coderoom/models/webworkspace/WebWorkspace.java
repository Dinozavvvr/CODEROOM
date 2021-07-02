package com.coderoom.models.webworkspace;

import com.coderoom.models.user.User;
import com.coderoom.models.workspace.enums.Theme;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;

/**
 * created: 21-05-2021 - 18:01
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class WebWorkspace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private Theme theme;

    @Column(columnDefinition="TEXT")
    private String htmlCode;

    @Column(columnDefinition="TEXT")
    private String cssCode;

    @Column(columnDefinition="TEXT")
    private String jsCode;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
