package com.coderoom.repositories;

import com.coderoom.models.room.Room;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * created: 07-05-2021 - 23:33
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public interface RoomRepository extends JpaRepository<Room, Long> {
}
