import React from 'react';
import { useHistory } from 'react-router';

/* import styles */
import '../../css/room/room-item-two.css';

function EditorItem({user, data, url}) {

    const history = useHistory();
    const redirectToWorkspace = (worspaceId) => {
        history.push(`${url}/${worspaceId}`);
    }

    return (
        <div className='room-item-two'>
            <div onClick={() => redirectToWorkspace(data.id)} className='room-item-two__image-wrapper'>
                <img className='room-item-two__image' />
            </div>
            <div className='room-item-two__descriprion'>
                <div className='room-item-two__author-image-wrapper'>
                    <img src={`http://localhost:8080/api/v.1/images/${user.image}`} className='room-two-item__author-image' />
                </div>
                <div className='room-item-two__text'>
                    <div className='room-item-two__title'>{data.title}</div>
                    <div className='room-item-two__author'>{user.name + ' ' + user.surname}</div>
                </div>
            </div>
            <div className='room-item-two__metainfo'>
                <div className='room-item-two-metainfo room-item-two-metainfo__likes'>
                    <div>
                        <svg width="12" height="12" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.50016 14.9021L7.35225 13.8571C3.27516 10.16 0.583496 7.72167 0.583496 4.72917C0.583496 2.29083 2.49933 0.375 4.93766 0.375C6.31516 0.375 7.63725 1.01625 8.50016 2.02958C9.36308 1.01625 10.6852 0.375 12.0627 0.375C14.501 0.375 16.4168 2.29083 16.4168 4.72917C16.4168 7.72167 13.7252 10.16 9.64808 13.865L8.50016 14.9021Z" />
                        </svg>
                    </div>
                    <span>1123</span>
                </div>
                <div className='room-item-two-metainfo room-item-two-metainfo__views'>
                    <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 6C15.79 6 19.17 8.13 20.82 11.5C19.17 14.87 15.79 17 12 17C8.21 17 4.83 14.87 3.18 11.5C4.83 8.13 8.21 6 12 6ZM12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4ZM12 9C13.38 9 14.5 10.12 14.5 11.5C14.5 12.88 13.38 14 12 14C10.62 14 9.5 12.88 9.5 11.5C9.5 10.12 10.62 9 12 9ZM12 7C9.52 7 7.5 9.02 7.5 11.5C7.5 13.98 9.52 16 12 16C14.48 16 16.5 13.98 16.5 11.5C16.5 9.02 14.48 7 12 7Z" />
                        </svg>
                    </div>
                    <span>108912</span>
                </div>
                <div className='room-item-two-metainfo room-item-two-metainfo__comments'>
                    <div>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5 0H1.5C0.675 0 0 0.675 0 1.5V15L3 12H13.5C14.325 12 15 11.325 15 10.5V1.5C15 0.675 14.325 0 13.5 0Z"/>
                        </svg>

                    </div>
                    <span>666</span>
                </div>
            </div>
        </div>
    );
}

export default EditorItem;