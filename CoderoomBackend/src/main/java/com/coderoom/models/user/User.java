package com.coderoom.models.user;

import com.coderoom.models.room.Room;
import com.coderoom.models.webworkspace.WebWorkspace;
import com.coderoom.models.workspace.Workspace;
import lombok.*;

import javax.persistence.*;
import java.util.List;

/**
 * created: 02-04-2021 - 16:10
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
@Table(name = "\"user\"", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email", name = "uniqueEmail"),
        @UniqueConstraint(columnNames = "nickname", name = "uniqueNickname")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 300)
    private String email;

    @Column(unique = true, nullable = false, length = 10)
    private String nickname;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String surname;

    @Column(nullable = false)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_has_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<Role> roles;

    @OneToMany(mappedBy = "user")
    private List<Workspace> workspaces;

    @ManyToMany
    @JoinTable(
            name = "user_has_room",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "room_id")
    )
    private List<Room> rooms;

    @OneToMany(mappedBy = "user")
    private List<WebWorkspace> webWorkspaces;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "account_data")
    private AccountData accountData;

    @Enumerated(value = EnumType.STRING)
    private Status status;

    @Enumerated(value = EnumType.STRING)
    private State state;

    public enum State {
        ACTIVE, BANNED, DELETED
    }

    public enum Status {
        SIMPLE, PRIME
    }

    public boolean isActive() {
        return state == State.ACTIVE;
    }

    public boolean isBanned() {
        return state == State.BANNED;
    }

    public boolean isDeleted() {
        return state == State.DELETED;
    }

    public boolean isAdmin() {
        return roles.stream()
                .anyMatch(role -> role.getName().equals(
                                Role.Roles.ADMIN
                ));
    }
}
