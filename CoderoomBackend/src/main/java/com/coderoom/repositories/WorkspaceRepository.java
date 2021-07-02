package com.coderoom.repositories;

import com.coderoom.models.workspace.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * created: 05-05-2021 - 17:43
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

    List<Workspace> findAllByUserId(Long id);
}
