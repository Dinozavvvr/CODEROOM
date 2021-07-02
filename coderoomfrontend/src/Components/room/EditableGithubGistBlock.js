import React, { useEffect, useState } from 'react';
/* import gist */
import Gist from 'react-gist'

/* import styles */
import '../../css/room/create-room.css';

function EditableGithubGistBlock(props) {

    const {
        value,
        onChange,
        defaultValue
    } = props;

    useEffect(() => {
        onChange(defaultValue);
    }, [])


    const iframeDoc = `
<html>
    <head>
        <base target="_parent">
        <style>
            ::-webkit-scrollbar {
                height: 0px;
                width: 0px;
            }
            body {
                margin: 0;
                padding: 0;
                height: 0px;
                owerflow: hidden;
            }
            * {
            font-size: 12px;
            font-family: 'JetBrains Mono' !important;
            font-weight: 600;
            }
        </style>
    </head>
    <body onload="parent.document.getElementById('gist-${value}').style.height=document.body.scrollHeight + 'px'">
        <script type="text/javascript" src="${value}.js"></script>
    </body>
</html>
    `

    function setGist(event) {
        onChange(event.target.value);
    }


    return (
        <div className='create-room-builder__gist-block'>
            <div className='create-room-builder-gist-block__set-gist-wrapper'>
                <label className='create-room-builder-gist-block__set-gist-label' id='gistInput'>Put link to file here!</label>
                <input
                    className='create-room-builder-gist-block__set-gist'
                    placeholder='https://gist.github/username...'
                    id='gistInput'
                    onChange={setGist}
                    value={value} />
            </div>

            <iframe
                frameBorder="0"
                className='iframe'
                id={`gist-${value}`}
                srcDoc={iframeDoc}>
            </iframe>
        </div>
    );
}

export default EditableGithubGistBlock;