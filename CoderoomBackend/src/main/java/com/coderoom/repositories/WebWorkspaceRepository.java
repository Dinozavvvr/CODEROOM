package com.coderoom.repositories;

import com.coderoom.models.webworkspace.WebWorkspace;
import com.coderoom.models.workspace.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * created: 21-05-2021 - 18:18
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public interface WebWorkspaceRepository extends JpaRepository<WebWorkspace, Long> {

    List<WebWorkspace> findAllByUserId(Long id);

}
