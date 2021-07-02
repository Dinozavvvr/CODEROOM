import React, { useEffect, useRef, useState } from 'react';
import EditablePlainText from './EditablePlainText';
import EditableGithubGistBlock from './EditableGithubGistBlock';
import EditableMarkdownText from './EditableMarkdownText';

/* import styles */
import '../../css/room/create-room.css';


const TEXT = 'plain-text';
const MARKDOWN = 'markdown-text';
const GITHUB_GIST = 'github-gist';

function EditableBlock(props) {

    const {
        block,
        onDelete,
        onChange
    } = props

    const { className } = props;
    const [shakeBlock, setShakeBlock] = useState(false);
    const [settingsState, setSettingsState] = useState(false);

    const settings = useRef(null);
    const settingsWindow = useRef(null);
    useEffect(() => {

        function handleClickOutside(e) {
            if (settings.current && settings.current.contains(e.target)) {
                setSettingsState(!settingsState);
            } else if (settings.current && !settingsWindow.current.contains(e.target)) {
                setSettingsState(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [settingsState])


    const deleteBlock = () => {
        onDelete(block.id)
    }

    const changeType = (type) => {
        block.type = type;
        onChange(block);
    }

    return (
        <div className={`
        create-room-builder__project-information-block 
        ${className} ${shakeBlock ? 'create-room-builder__project-information-block-shake' : ''}`}>
            <div className='create-room-builder-project-information-block__header 
            create-room-builder-info-block-header'>
                <div className='create-room-builder-info-block-header__title'>
                    {
                        block.type == TEXT ? 'Plain text' :
                            block.type == MARKDOWN ? 'Markdown doc.' :
                                block.type == GITHUB_GIST ? 'Github gist' : ''
                    }
                </div>
                <div className='create-room-builder-info-block-header__buttons'>
                    <div className='create-room-builder-info-block-header__delete'
                        onClick={() => deleteBlock()}
                        onMouseEnter={() => setShakeBlock(true)}
                        onMouseLeave={() => setShakeBlock(false)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 9V19H8V9H16ZM14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM18 7H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7Z" />
                        </svg>

                    </div>
                    <div ref={settings} className={`create-room-builder-info-block-header__setting 
                        ${settingsState ? 'create-room-builder-info-block-header__settings-active' : ''}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.4298 12.98C19.4698 12.66 19.4998 12.34 19.4998 12C19.4998 11.66 19.4698 11.34 19.4298 11.02L21.5398 9.37C21.7298 9.22 21.7798 8.95 21.6598 8.73L19.6598 5.27C19.5698 5.11 19.3998 5.02 19.2198 5.02C19.1598 5.02 19.0998 5.03 19.0498 5.05L16.5598 6.05C16.0398 5.65 15.4798 5.32 14.8698 5.07L14.4898 2.42C14.4598 2.18 14.2498 2 13.9998 2H9.99984C9.74984 2 9.53984 2.18 9.50984 2.42L9.12984 5.07C8.51984 5.32 7.95984 5.66 7.43984 6.05L4.94984 5.05C4.88984 5.03 4.82984 5.02 4.76984 5.02C4.59984 5.02 4.42984 5.11 4.33984 5.27L2.33984 8.73C2.20984 8.95 2.26984 9.22 2.45984 9.37L4.56984 11.02C4.52984 11.34 4.49984 11.67 4.49984 12C4.49984 12.33 4.52984 12.66 4.56984 12.98L2.45984 14.63C2.26984 14.78 2.21984 15.05 2.33984 15.27L4.33984 18.73C4.42984 18.89 4.59984 18.98 4.77984 18.98C4.83984 18.98 4.89984 18.97 4.94984 18.95L7.43984 17.95C7.95984 18.35 8.51984 18.68 9.12984 18.93L9.50984 21.58C9.53984 21.82 9.74984 22 9.99984 22H13.9998C14.2498 22 14.4598 21.82 14.4898 21.58L14.8698 18.93C15.4798 18.68 16.0398 18.34 16.5598 17.95L19.0498 18.95C19.1098 18.97 19.1698 18.98 19.2298 18.98C19.3998 18.98 19.5698 18.89 19.6598 18.73L21.6598 15.27C21.7798 15.05 21.7298 14.78 21.5398 14.63L19.4298 12.98ZM17.4498 11.27C17.4898 11.58 17.4998 11.79 17.4998 12C17.4998 12.21 17.4798 12.43 17.4498 12.73L17.3098 13.86L18.1998 14.56L19.2798 15.4L18.5798 16.61L17.3098 16.1L16.2698 15.68L15.3698 16.36C14.9398 16.68 14.5298 16.92 14.1198 17.09L13.0598 17.52L12.8998 18.65L12.6998 20H11.2998L11.1098 18.65L10.9498 17.52L9.88984 17.09C9.45984 16.91 9.05984 16.68 8.65984 16.38L7.74984 15.68L6.68984 16.11L5.41984 16.62L4.71984 15.41L5.79984 14.57L6.68984 13.87L6.54984 12.74C6.51984 12.43 6.49984 12.2 6.49984 12C6.49984 11.8 6.51984 11.57 6.54984 11.27L6.68984 10.14L5.79984 9.44L4.71984 8.6L5.41984 7.39L6.68984 7.9L7.72984 8.32L8.62984 7.64C9.05984 7.32 9.46984 7.08 9.87984 6.91L10.9398 6.48L11.0998 5.35L11.2998 4H12.6898L12.8798 5.35L13.0398 6.48L14.0998 6.91C14.5298 7.09 14.9298 7.32 15.3298 7.62L16.2398 8.32L17.2998 7.89L18.5698 7.38L19.2698 8.59L18.1998 9.44L17.3098 10.14L17.4498 11.27ZM11.9998 8C9.78984 8 7.99984 9.79 7.99984 12C7.99984 14.21 9.78984 16 11.9998 16C14.2098 16 15.9998 14.21 15.9998 12C15.9998 9.79 14.2098 8 11.9998 8ZM11.9998 14C10.8998 14 9.99984 13.1 9.99984 12C9.99984 10.9 10.8998 10 11.9998 10C13.0998 10 13.9998 10.9 13.9998 12C13.9998 13.1 13.0998 14 11.9998 14Z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div
                ref={settingsWindow}
                className={`create-room-builder-info-block__settings 
                ${settingsState ? 'create-room-builder-info-block__settings-active' : ''}`}>
                <div onClick={() => changeType('plain-text')}
                    className={`create-room-builder-info-block__settings-item 
                    ${block.type == 'plain-text' ? 'create-room-builder-info-block__settings-item-active' : ''}`}>
                    Plain Text
                </div>
                <div onClick={() => changeType('markdown-text')}
                    className={`create-room-builder-info-block__settings-item 
                    ${block.type == 'markdown-text' ? 'create-room-builder-info-block__settings-item-active' : ''}`}>
                    Markdown doc.
                </div>
                <div onClick={() => changeType('github-gist')}
                    className={`create-room-builder-info-block__settings-item 
                    ${block.type == 'github-gist' ? 'create-room-builder-info-block__settings-item-active' : ''}`}>
                    Github gist
                </div>
            </div>
            {
                block.type == TEXT ? <EditablePlainText value={block.content} placeholder='Start typing here' onChange={(text) => {block.content = text; onChange(block)}}/> :
                    block.type == MARKDOWN ? <EditableMarkdownText value={block.content} defaultValue='# Start typing here' onChange={(markdown) => {block.content = markdown; onChange(block)}}/> :
                        block.type == GITHUB_GIST ? <EditableGithubGistBlock value={block.content} defaultValue='https://gist.github.com/Dinozavvvr/0a4e246b14db549e34c939122f8616d6' onChange={(gist) => {block.content = gist; onChange(block)}}/> : ''
            }
            <div className='create-room-builder-project-information__plain-text-block-font-size'>
                font-size: 18px
            </div>
        </div>
    )
};

export default EditableBlock;