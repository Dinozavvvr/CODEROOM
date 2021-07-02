import React, { useEffect, useState } from 'react';
import MarkdownEditor from './MarkdownEditor';
import MarkdownPreview from './MarkdownPreview';

/* import styles */
import '../../css/room/create-room.css';

function EditableMarkdownText(props) {
    const {
        value,
        onChange,
        defaultValue
    } = props;

    useEffect(() => {
        onChange(defaultValue);
    }, [])

    return (
        <div className='create-room-builder__markdown-block-wrapper'>
            <MarkdownEditor
                text={value}
                onChange={onChange}
            />
            <MarkdownPreview
                markdown={value}
            />
        </div>
    )
}

export default EditableMarkdownText;