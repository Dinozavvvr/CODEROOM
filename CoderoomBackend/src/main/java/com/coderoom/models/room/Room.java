package com.coderoom.models.room;

import com.coderoom.models.language.Language;
import com.coderoom.models.user.User;
import com.coderoom.models.workspace.Workspace;
import lombok.*;

import javax.persistence.*;
import java.util.List;

/**
 * created: 09-04-2021 - 12:36
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
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    @Enumerated(value = EnumType.STRING)
    private Access access;

    @ManyToMany
    @JoinTable(
            name = "room_has_language",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "language_id")
    )
    private List<Language> languages;

    @ManyToMany(mappedBy = "rooms")
    private List<User> contributors;

    @ManyToMany
    @JoinTable(
            name = "room_has_workspace",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "workspace_id")
    )
    private List<Workspace> workspaces;

    public enum Access {
        PUBLIC, PRIVATE
    }

}
