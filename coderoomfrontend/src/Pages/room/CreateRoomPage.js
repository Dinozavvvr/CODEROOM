import React, { useEffect, useRef, useState } from 'react';
import LanguageItem from '../../Components/LanguageItem';
import EditableBlock from '../../Components/room/EditableBlock';
import StandartFooter from '../../Components/StandartFooter';
import StandartHeader from '../../Components/StandartHeader';
import axios from 'axios';
import getLanguages from '../../Services/LanguagesService';
import getMe from '../../Services/UserService';
import useCookie from '../../hooks/CookiesHook';
import { createRoom, getRoomInitializePage } from '../../Services/RoomService';
import RoomItemTwo from '../../Components/room/RoomItemTwo';

/* import styles */
import '../../css/room/create-room.css';
import { useHistory } from 'react-router';
import Loader from '../../Components/Loader';
import { getUserWorkspaces } from '../../Services/WorkspaceService';


const TEXT = 'plain-text';
const MARKDOWN = 'markdown-text';
const GITHUB_GIST = 'github-gist';

function CreateRoom(params) {

    /* data */
    const [roomName, setRoomName] = useState('');
    const [isPublic, setIsPublic] = useState(true);

    // languages
    const [languages, setLanguages] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    // information
    const initialBlocks = [
        { id: 1, type: TEXT, content: '' },
        { id: 2, type: MARKDOWN, content: '' },
        { id: 3, type: GITHUB_GIST, content: '' }
    ];
    const [blocks, setBlocks] = useState([...initialBlocks]);

    // contributors
    const [contributors, setContributors] = useState([]);

    // search users
    const [usersSearch, setUsersSearch] = useState(false);

    // editors
    const [editors, setEditors] = useState([]);

    // search editors
    const [editorsSearch, setEditorSearch] = useState(false);

    // me
    const [me, setMe] = useState({});

    const headers = { Authorization: useCookie('oAuthToken') };
    const history = useHistory();

    /* state */
    const [loading, setLoading] = useState(true);

    const addInfrormationBlock = useRef(null);
    const scrollToButton = () => {

        const y = addInfrormationBlock.current.getBoundingClientRect().bottom
            + window.pageYOffset - window.innerHeight + 20;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }

    useEffect(async () => {
        let response = await getRoomInitializePage(headers)
        console.log(response)
        if (response) {
            getLanguages().
                then(data => setLanguages(data));
            getMe(headers)
                .then(data => {
                    setMe(data)
                    setContributors([data]);
                })
            setLoading(false);
        } else {
            history.push('/account')
        }
    }, [])








    const setLanguage = (language) => {
        if (!selectedLanguages.some(lang => lang.id === language.id)) {
            setSelectedLanguages([...selectedLanguages, language]);
        }
    }








    const addBlock = () => {
        new Promise((resolve, reject) => {
            if (blocks.length > 0) {
                setBlocks([...blocks,
                {
                    id: Math.max(...blocks.map(item => item.id)) + 1,
                    type: 'plain-text',
                    content: ''
                }]);
            } else {
                setBlocks([{ id: 1, type: TEXT, content: '' }]);
            }
            resolve()
        })
            .then(() => scrollToButton());
    }

    const removeBlock = (id) => {
        setBlocks(blocks.filter(block => block.id !== id));
    }

    const setBlock = (block) => {
        let blocksCopy = [...blocks];
        blocksCopy.map(b => {
            if (b.id == block.id) {
                b = block;
            }
        })
        setBlocks(blocksCopy);
    }







    const addContributor = user => {
        if (!contributors.some(contributor => contributor.id === user.id)) {
            setContributors([...contributors, user])
        }
    }

    const hasUser = id => {
        return contributors.some(contributor => contributor.id === id);
    }

    const deleteContributor = id => {
        if (id !== me.id) {
            setContributors(contributors.filter(user => user.id !== id))
        }
    }








    const addEditor = editor => {
        if (!editors.some(e => e.id === editor.id)) {
            setEditors([...editors, editor])
        }
    }

    const hasEditor = id => {
        return editors.some(editor => editor.id === id);
    }

    const delteEditor = id => {
        setEditors(editors.filter(editor => editor.id !== id))
    }






    const redirectToAccount = () => {
        history.push('/account')
    }


    const saveRoom = () => {
        const room = {
            title: roomName,
            description: JSON.stringify(blocks),
            access: isPublic ? 'PUBLIC' : 'PRIVATE',
            languages: selectedLanguages,
            contributors: contributors,
            workspaces: editors
        }
        createRoom(room, headers)
            .then(() => redirectToAccount());
    }






    return (
        <>
            {(() => {
                if (loading) {
                    return (
                        <div className='admin-users-page__loader-wrapper'>
                            <Loader />
                        </div>
                    )
                } else {
                    return (
                        <>
                            <StandartHeader authenticated={true} />
                            <div className='create-room-main'>
                                <h2 className='create-room-main__title'>
                                    Create a new Room
                                </h2>
                                <div className='create-room-main__buider create-room-builder'>


                                    {/*
                                        Set name and access modificator block 
                                     */}


                                    <div className='create-room-builder__first-block'>
                                        <div className='create-room-builder__room-name'>
                                            Room name
                                        </div>
                                        <div className='create-room-builder__room-name-wrapper'>
                                            <input
                                                className='create-room-builder__room-name-input'
                                                type='text'
                                                name='roomName'
                                                value={roomName}
                                                onChange={e => setRoomName(e.target.value)}
                                                placeholder='My first room...' />
                                            <div onClick={() => setIsPublic(!isPublic)}
                                                className='create-room-builder__change-access'>
                                                {isPublic ?
                                                    <svg className='create-room-builder__lock'
                                                        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6H9C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM18 20H6V10H18V20ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z" />
                                                    </svg>
                                                    :
                                                    <svg className='create-room-builder__lock'
                                                        width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M18 8.19287L17 8.19287V6.19287C17 3.43287 14.76 1.19287 12 1.19287C9.24 1.19287 7 3.43287 7 6.19287L7 8.19287H6C4.9 8.19287 4 9.09287 4 10.1929L4 20.1929C4 21.2929 4.9 22.1929 6 22.1929L18 22.1929C19.1 22.1929 20 21.2929 20 20.1929L20 10.1929C20 9.09287 19.1 8.19287 18 8.19287ZM12 17.1929C10.9 17.1929 10 16.2929 10 15.1929C10 14.0929 10.9 13.1929 12 13.1929C13.1 13.1929 14 14.0929 14 15.1929C14 16.2929 13.1 17.1929 12 17.1929ZM15.1 8.19287L8.9 8.19287V6.19287C8.9 4.48287 10.29 3.09287 12 3.09287C13.71 3.09287 15.1 4.48287 15.1 6.19287L15.1 8.19287Z" />
                                                    </svg>

                                                }

                                                <span>{isPublic ? 'public' : 'private'}</span>
                                            </div>
                                        </div>
                                    </div>


                                    {/*
                                    Select languages block 
                                    */}


                                    <div className='create-room-builder__select-language-block'>
                                        <div className='create-room-builder__block-title'>
                                            Choose languages
                                        </div>
                                        <div className='create-room-builder__languages'>
                                            {
                                                languages.map(language => {
                                                    return (
                                                        <LanguageItem className='create-room-builder__language'
                                                            language={language}
                                                            onChange={setLanguage} />
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>


                                    {/*
                                Project information block 
                             */}


                                    <div className='create-room-builder__project-information'>
                                        <div className='create-room-builder__block-title'>
                                            Project information
                                        </div>
                                        <div className='create-room-buider__prompt'>
                                            Click settings to select the block type. default is plain text
                                        </div>
                                        <div>
                                            {
                                                blocks.map(block => {
                                                    return (<EditableBlock
                                                        block={block}
                                                        onDelete={removeBlock}
                                                        onChange={setBlock}
                                                        className='create-room-builder__information-block' />)
                                                })
                                            }
                                        </div>
                                        <div onClick={() => addBlock()} ref={addInfrormationBlock} className='create-room-builder__add-block'>
                                            add block
                                        </div>
                                    </div>


                                    {/*
                                Editors block 
                             */}


                                    <div className='create-room-builder__editors-block'>
                                        <div className='create-room-builder__block-title'>
                                            Project editors
                                        </div>
                                        <div className='create-room-builder__editors'>
                                            {
                                                editors.map(editor => <WorkspaceItem user={me} workspace={editor} onDelete={delteEditor}/>)
                                            }
                                            <div className='create-room-builder__add-editor-wrapper'>
                                                <div onClick={() => setEditorSearch(!editorsSearch)} className='create-room-builder__add-editor'>
                                                    add editor
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className='create-room-builder__contributors-block'>
                                        <div className='create-room-builder__block-title'>
                                            Project contributors
                                        </div>
                                        <div className='create-room-builder__contributors'>
                                            {
                                                contributors.length != 0 ? <Contributor user={contributors[0]} /> : ''
                                            }
                                            {
                                                contributors.slice(1, contributors.length)
                                                    .map(contributor => <EditableContributor user={contributor} />)
                                            }
                                            <AddContributor onClick={() => setUsersSearch(!usersSearch)} />
                                        </div>
                                    </div>

                                    {usersSearch ?
                                        <UsersSearch
                                            setVisibility={setUsersSearch}
                                            addContributor={addContributor}
                                            deleteContributor={deleteContributor}
                                            hasUser={hasUser} />
                                        : null}

                                    {editorsSearch ?
                                        <EditorsSearch
                                            setVisibility={setEditorSearch}
                                            addEditor={addEditor}
                                            delteEditor={delteEditor}
                                            user={me}
                                            hasEditor={hasEditor}
                                        />
                                        : null}

                                    <div onClick={() => saveRoom()}
                                        className='create-room-builder__post'>
                                        save and post
                                    </div>
                                </div>
                            </div>
                            <StandartFooter />
                        </>
                    )
                }
            })()}

        </>
    )
};

function UsersSearch(props) {

    const [searchValue, setSearchValue] = useState('');
    const [users, setUsers] = useState([]);

    const {
        addContributor,
        deleteContributor,
        hasUser,
        setVisibility
    } = props;

    const [show, setShow] = useState(false);

    const handleSearchChange = event => {
        setSearchValue(event.target.value);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchValue != '') {
                axios.get(`http://localhost:8080/api/v.1/users/search/0/10/${searchValue}`)
                    .then(res => {
                        setUsers(res.data);
                    })
            }
        }, 700);
        return () => clearTimeout(timeout);
    }, [searchValue])

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    useEffect(() => {
        setShow(true);
    }, [])

    const hideSearch = () => {
        new Promise((resolve, reject) => {
            setShow(false);
            resolve();
        })
            .then(() => sleep(1000))
            .then(() => setVisibility(false));
    }

    return (
        <div className={`create-room-builder__search ${show ? 'create-room-builder__search-active' : ''}`}>
            <span className='create-room-builder__search-close'
                onClick={() => hideSearch(false)}></span>
            <div className='create-room-builder__search-header'>
                <div className='create-room-builder__search-input-wrapper'>
                    <input className='create-room-builder__search-input'
                        placeholder='nickname'
                        onChange={(event) => handleSearchChange(event)}
                        value={searchValue} />
                </div>
                <div className='create-room-builder__search-button'>
                    search
                </div>
            </div>
            <div className='create-room-builder__search-users'>
                {
                    users.map(user => <User 
                        user={user} 
                        addContributor={addContributor} 
                        added={hasUser(user.id)}
                        deleteContributor={deleteContributor}/>)
                }
            </div>
        </div>
    )
}


function WorkspaceItem(props) {

    const {
        user,
        workspace,
        onDelete
    } = props;

    return (
        <div>
            <RoomItemTwo 
                user={user} 
                data={workspace}
                url={'workspace'}/>
            <div onClick={() => onDelete(workspace.id)} 
                className='create-room-builder__workspace-delete-button'>
                delete
            </div>
        </div>
    )
}


function EditorsSearch(props) {

    const [searchValue, setSearchValue] = useState('');

    const {
        user,
        hasEditor,
        addEditor,
        delteEditor,
        setVisibility
    } = props;

    const handleSearchChange = event => {
        setSearchValue(event.target.value);
    }

    const headers = { Authorization: useCookie('oAuthToken') };
    const [show, setShow] = useState(false);
    const [workspaces, setWorkspaces] = useState([]);

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    useEffect(() => {
        setShow(true);
    }, [])

    useEffect(() => {
        getUserWorkspaces(user.id, headers)
            .then(workspaces => setWorkspaces(workspaces))
    }, [])

    const hideSearch = () => {
        new Promise((resolve, reject) => {
            setShow(false);
            resolve();
        })
            .then(() => sleep(1000))
            .then(() => setVisibility(false));
    }

    return (
        <div className={`create-room-builder__search ${show ? 'create-room-builder__search-active' : ''}`}>
            <span className='create-room-builder__search-close'
                onClick={() => hideSearch(false)}></span>
            <div className='create-room-builder__search-header'>
                <div className='create-room-builder__search-input-wrapper'>
                    <input className='create-room-builder__search-input'
                        placeholder='editor name'
                        onChange={(event) => handleSearchChange(event)}
                        value={searchValue} />
                </div>
                <div className='create-room-builder__search-button'>
                    search
                </div>
            </div>
            <div className='create-room-builder__search-users'>
                {
                    workspaces.map(workspace => <Editor
                        workspace={workspace}
                        user={user}
                        added={hasEditor(workspace.id)}
                        onAdd={addEditor} 
                        onDelete={delteEditor} />)
                }
            </div>
        </div>
    );
}

function Editor(props) {

    const {
        user,
        workspace,
        onAdd,
        onDelete,
        added
    } = props;

    const onClick = workspace => {
        added ? onDelete(workspace.id) : onAdd(workspace)
    }

    return (
        <div className='create-room-builder__workspace'>
            <div className='create-room-builder__workspace-image-wrapper'>
                <img src={`http://localhost:8080/api/v.1/images/${user.image}`}
                    className='create-room-builder__workspace-image' />
            </div>
            <div className='create-room-builder__workspace-info'>
                <div className='create-room-builder__workspace-title'>
                    {workspace.title}
                </div>
                <div className='create-room-builder__workspace-description'>
                    {workspace.description}
                </div>
            </div>
            <div onClick={() => onClick(workspace)} className='create-room-builder__workspace-add'>
                {added ? 'delete' : 'add'}
            </div>
        </div>
    )
}

function User(props) {

    const {
        user,
        addContributor,
        deleteContributor,
        added
    } = props


    const onClick = user => {
        added ? deleteContributor(user.id) : addContributor(user);
    }

    return (
        <div className='create-room-builder__user'>
            <div className='create-room-builder__user-image-wrapper'>
                <img src={`http://localhost:8080/api/v.1/images/${user.image}`}
                    className='create-room-builder__user-image' />
            </div>
            <div className='create-room-builder__user-info'>
                <div className='create-room-builder__user-nickname'>
                    {user.nickname}
                </div>
                <div className='create-room-builder__user-fio'>
                    {user.name} {user.surname}
                </div>
            </div>
            <div onClick={() => onClick(user)} className='create-room-builder__user-add'>
                {added ? 'delete' : 'add'}
            </div>
        </div>
    )
}

function AddContributor(props) {

    const {
        onClick
    } = props;

    return (
        <div className='create-room-builder__contributor-wrapper create-room-builder__add-contributor'
            onClick={() => onClick()}>
            {/* <img className='create-room-builder__contributor-image'/> */}

            <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M37.5003 27.0832H27.0837V37.4998C27.0837 38.6457 26.1462 39.5832 25.0003 39.5832C23.8545 39.5832 22.917 38.6457 22.917 37.4998V27.0832H12.5003C11.3545 27.0832 10.417 26.1457 10.417 24.9998C10.417 23.854 11.3545 22.9165 12.5003 22.9165H22.917V12.4998C22.917 11.354 23.8545 10.4165 25.0003 10.4165C26.1462 10.4165 27.0837 11.354 27.0837 12.4998V22.9165H37.5003C38.6462 22.9165 39.5837 23.854 39.5837 24.9998C39.5837 26.1457 38.6462 27.0832 37.5003 27.0832Z" fill="#242428" />
            </svg>

        </div>
    )
}

function EditableContributor(props) {


    const { user } = props;

    return (
        <Contributor user={user} />
    )
}

function Contributor(props) {
    const { user } = props
    return (
        <div className='create-room-builder__contributor-wrapper'>
            <img src={`http://localhost:8080/api/v.1/images/${user.image}`} className='create-room-builder__contributor-image' />
        </div>
    )
}

export default CreateRoom;