package com.coderoom.models.language;

import com.coderoom.models.room.Room;
import com.coderoom.models.workspace.Workspace;
import com.coderoom.models.language.enums.LanguageConverter;
import com.coderoom.models.language.enums.Languages;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

/**
 * created: 09-04-2021 - 13:02
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Language {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /*
        don't use annotation @Enumerated(EnumType.STRING)
        with @Convert annotation

        it's important!
     */
    @Convert(converter = LanguageConverter.class)
    private Languages name;

    private String type;

    @OneToMany(mappedBy = "language")
    private List<Workspace> workspaces;

    @ManyToMany(mappedBy = "languages")
    private List<Room> rooms;

}
