import React from 'react';
import { useHistory } from 'react-router';
import '../css/room-item.css'

function RoomItem(props) {

    const {
        user,
        data
    } = props;

    const history = useHistory();

    const redirectToRoom = (roomId) => {
        history.push(`/room/${roomId}`);
    }

    return(
        <div className={'room-item'}>
            <div onClick={() => redirectToRoom(data.id)} 
                className={'room-item__image-wrapper'}>
                <img className={'room-item__image'}/>
            </div>
            <div className={'room-item__descriprion'}>
                <div className={'room-item__author-image-wrapper'}>
                    <img src={`http://localhost:8080/api/v.1/images/${user.image}`} className={'room-item__author-image'}/>
                </div>
                <div className={'room-item__text'}>
                    <div className={'room-item__title'}>{data.title}</div>
                    <div className={'room-item__author'}>{`${user.name} ${user.surname}`}</div>
                </div>
            </div>
            <div className={'room-item__metainfo'}>
                <div className={'room-item-metainfo room-item-metainfo__likes'}>1123</div>
                <div className={'room-item-metainfo room-item-metainfo__views'}>108912</div>
                <div className={'room-item-metainfo room-item-metainfo__comments'}>666</div>
            </div>
        </div>
    )

}

export default RoomItem;