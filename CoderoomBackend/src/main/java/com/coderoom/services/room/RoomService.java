package com.coderoom.services.room;

import com.coderoom.dto.room.CreateRoomDto;
import com.coderoom.dto.room.RoomDto;

/**
 * created: 07-05-2021 - 23:33
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public interface RoomService {

    RoomDto create(CreateRoomDto createRoomDto);

    RoomDto getRoomById(Long id);
}
