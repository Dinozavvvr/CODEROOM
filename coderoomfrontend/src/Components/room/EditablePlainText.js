import React, { useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
/* import styles */
import '../../css/room/create-room.css';

function EditablePlainText(props) {

    const {
        value,
        onChange,
        placeholder
    } = props;

    function changeValue(value) {
        onChange(value.target.value);
    }

    useEffect(() => {
        onChange('')
    },[])

    return (
        <>
            <TextareaAutosize
                value={value}
                onChange={changeValue}
                className='create-room-builder-project-information__plain-text-block'
                placeholder={placeholder}/>
        </>
    )
}

export default EditablePlainText;