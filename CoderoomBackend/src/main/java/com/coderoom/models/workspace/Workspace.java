package com.coderoom.models.workspace;

import com.coderoom.models.room.Room;
import com.coderoom.models.user.User;
import com.coderoom.models.language.Language;
import com.coderoom.models.workspace.enums.Theme;
import lombok.*;

import javax.persistence.*;
import java.util.List;

/**
 * created: 09-04-2021 - 13:05
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Workspace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "language_id", nullable = false)
    private Language language;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false, length = 20)
    @Enumerated(value = EnumType.STRING)
    private Theme theme;

    private String code;

    @ManyToMany(mappedBy = "workspaces")
    private List<Room> rooms;

}
