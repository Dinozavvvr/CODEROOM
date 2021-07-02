import '../../css/room/room.css';
import StandartHeader from '../../Components/StandartHeader';
import StandartFooter from '../../Components/StandartFooter';
import MarkdownPreview from '../../Components/room/MarkdownPreview';
import Loader from '../../Components/Loader';
import { useEffect, useRef, useState } from 'react';
import { getRoom } from '../../Services/RoomService';
import { useRouteMatch } from 'react-router';
import useCookie from '../../hooks/CookiesHook';
import RoomItemTwo from '../../Components/room/RoomItemTwo';

const TEXT = 'plain-text';
const MARKDOWN = 'markdown-text';
const GIT_GIST = 'github-gist';

const roomDto = {
    "title": "Комната альберта в ДУ",
    "description": "[{\"id\":1,\"type\":\"plain-text\",\"content\":\"Welcome to the Swift community. Together we are working to build a programming language to empower everyone to turn their ideas into apps on any platform.\\n\\nAnnounced in 2014, the Swift programming language has quickly become one of the fastest growing languages in history. Swift makes it easy to write software that is incredibly fast and safe by design. Our goals for Swift are ambitious: we want to make programming simple things easy, and difficult things possible.\\n\\nFor students, learning Swift has been a great introduction to modern programming concepts and best practices. And because it is open, their Swift skills will be able to be applied to an even broader range of platforms, from mobile devices to the desktop to the cloud.\"},{\"id\":2,\"type\":\"plain-text\",\"content\":\"Announced in 2014, the Swift programming language has quickly become one of the fastest growing languages in history. Swift makes it easy to write software that is incredibly fast and safe by design. Our goals for Swift are ambitious: we want to make programming simple things easy, and difficult things possible.\\n\\nFor students, learning Swift has been a great introduction to modern programming concepts and best practices. And because it is open, their Swift skills will be able to be applied to an even broader range of platforms, from mobile devices to the desktop to the cloud.\"},{\"id\":3,\"type\":\"github-gist\",\"content\":\"https://gist.github.com/Dinozavvvr/9080e3c053d7b269ac3fd17361af6c58\"},{\"id\":4,\"type\":\"plain-text\",\"content\":\"Welcome to the Swift community. Together we are working to build a programming language to empower everyone to turn their ideas into apps on any platform.\\n\\nFor students, learning Swift has been a great introduction to modern programming concepts and best practices. And because it is open, their Swift skills will be able to be applied to an even broader range of platforms, from mobile devices to the desktop to the cloud.\"},{\"id\":5,\"type\":\"plain-text\",\"content\":\"Альберт красава все по фактам расписал учитесь хуйней не занимайтесь\"},{\"id\":6,\"type\":\"markdown-text\",\"content\":\"# :smile: :smile: :smile: :smile: :smile: :smile: :smile:\\nlist:\\n* todo 1\\n* todo 2\\n![image](https://miro.medium.com/max/2400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg)\"},{\"id\":9,\"type\":\"plain-text\",\"content\":\"все\"}]",
    "access": "PRIVATE",
    "languages": [
        {
            "id": 4,
            "name": "Python",
            "type": "text/x-python"
        },
        {
            "id": 8,
            "name": "Objective-C",
            "type": "text/x-objectivec"
        },
        {
            "id": 20,
            "name": "Swift",
            "type": "text/x-swift"
        },
        {
            "id": 22,
            "name": "MySQL",
            "type": "text/x-mysql"
        },
        {
            "id": 28,
            "name": "JSON",
            "type": "application/json"
        }
    ],
    "workspaces": [],
    "contributors": [
        {
            "id": 4,
            "email": "adelya@gmail.com",
            "nickname": "adelya",
            "name": "Adelya",
            "surname": "Sharipova",
            "state": "ACTIVE",
            "roles": [
                {
                    "name": "VIEWER"
                }
            ],
            "image": "3db7aa91-e57b-49d8-9c23-e72a9dff0d0a.jpg"
        },
        {
            "id": 5,
            "email": "albert@gmail.com",
            "nickname": "albert",
            "name": "Albert",
            "surname": "Akhmadiev",
            "state": "ACTIVE",
            "roles": [
                {
                    "name": "VIEWER"
                }
            ],
            "image": "defaultProfileImage.jpg"
        },
        {
            "id": 3,
            "email": "anton@gmail.com",
            "nickname": "anton",
            "name": "Anton",
            "surname": "Sheverda",
            "state": "ACTIVE",
            "roles": [
                {
                    "name": "VIEWER"
                }
            ],
            "image": "b5403ee0-c9a3-4931-a457-f1519962f28d.jpg"
        },
        {
            "id": 1,
            "email": "admin@gmail.com",
            "nickname": "admin",
            "name": "Admin",
            "surname": "Admin",
            "state": "ACTIVE",
            "roles": [
                {
                    "name": "VIEWER"
                },
                {
                    "name": "USER"
                },
                {
                    "name": "ADMIN"
                }
            ],
            "image": "5b955d59-3aa2-4683-b265-4b5baa755f5b.jpg"
        }
    ]
}

function RoomPage() {
    return (
        <>
            <StandartHeader authenticated={true} />
            <RoomPageBody />
            <StandartFooter />
        </>
    )
}

function RoomPageBody(props) {

    const [loading, setLoading] = useState(true);
    const headers = { Authorization: useCookie('oAuthToken') };
    const match = useRouteMatch();
    const [room, setRoom] = useState({});

    useEffect(() => {
        getRoom(match.params.id, headers)
            .then(res => res.data)
            .then(data => setRoom(data))
            .then(() => setLoading(false))
    }, [])

    return (
        <>
            {loading ? null :
                <div className='room__main'>
                    <div className='room__data'>
                        <RoomPageFirstBlock room={room} />
                        <RoomPageProjectInformation description={room.description} />
                        <RoomPageWorkspaces workspaces={room.workspaces} />
                        <RoomPageContributors contributors={room.contributors} />
                    </div>
                </div>
            }
        </>
    )
}

function RoomPageFirstBlock({ room }) {

    return (
        <div className='room__first-block'>
            <div className='room-first-block__top'>
                <div className='room__image-wrapper'>
                    <img />
                </div>
                <div className='room__title-block-wrapper'>
                    <RoomPageTitle
                        title={room.title}
                        contributors={room.contributors}
                        access={room.access} />
                </div>
            </div>
            <div className='room-first-block__bottom'>
                <p className='room__languages-title'>Languages</p>
                <RoomPageLanguages languages={room.languages} />
                <div className='room__metainfo'>
                    <div className='room__metainfo-item room__metainfo-likes'>
                        <div>
                            <svg width="12" height="12" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.50016 14.9021L7.35225 13.8571C3.27516 10.16 0.583496 7.72167 0.583496 4.72917C0.583496 2.29083 2.49933 0.375 4.93766 0.375C6.31516 0.375 7.63725 1.01625 8.50016 2.02958C9.36308 1.01625 10.6852 0.375 12.0627 0.375C14.501 0.375 16.4168 2.29083 16.4168 4.72917C16.4168 7.72167 13.7252 10.16 9.64808 13.865L8.50016 14.9021Z" />
                            </svg>
                        </div>
                        <span>1123</span>
                    </div>
                    <div className='room__metainfo-item room__metainfo-views'>
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 6C15.79 6 19.17 8.13 20.82 11.5C19.17 14.87 15.79 17 12 17C8.21 17 4.83 14.87 3.18 11.5C4.83 8.13 8.21 6 12 6ZM12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4ZM12 9C13.38 9 14.5 10.12 14.5 11.5C14.5 12.88 13.38 14 12 14C10.62 14 9.5 12.88 9.5 11.5C9.5 10.12 10.62 9 12 9ZM12 7C9.52 7 7.5 9.02 7.5 11.5C7.5 13.98 9.52 16 12 16C14.48 16 16.5 13.98 16.5 11.5C16.5 9.02 14.48 7 12 7Z" />
                            </svg>
                        </div>
                        <span>108912</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function RoomPageLanguages({ languages }) {
    return (
        <div className="room__languages">
            {languages.map(language => <RoomPageLanguage name={language.name} />)}
        </div>
    )
}

function RoomPageLanguage({ name }) {
    return (
        <div className="room__language">
            {name}
        </div>
    )
}


function RoomPageTitle(props) {
    const {
        title,
        contributors,
        access
    } = props;

    return (
        <div className='room__title-block'>
            <div className='room-title-block__info'>
                <div className='room-title-block__title'>
                    {title}
                </div>
                <div className='room-title-block__contributors'>
                    {contributors.map(user => {
                        return <span style={{ marginRight: '12px' }}>{`${user.name} ${user.surname}`}</span>
                    })}
                </div>
            </div>
            <div className='room-title-block__meta'>
                {access === 'PUBLIC' ?
                    <svg className='room-title-block__lock'
                        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6H9C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM18 20H6V10H18V20ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z" />
                    </svg>
                    :
                    <svg className='room-title-block__lock'
                        width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 8.19287L17 8.19287V6.19287C17 3.43287 14.76 1.19287 12 1.19287C9.24 1.19287 7 3.43287 7 6.19287L7 8.19287H6C4.9 8.19287 4 9.09287 4 10.1929L4 20.1929C4 21.2929 4.9 22.1929 6 22.1929L18 22.1929C19.1 22.1929 20 21.2929 20 20.1929L20 10.1929C20 9.09287 19.1 8.19287 18 8.19287ZM12 17.1929C10.9 17.1929 10 16.2929 10 15.1929C10 14.0929 10.9 13.1929 12 13.1929C13.1 13.1929 14 14.0929 14 15.1929C14 16.2929 13.1 17.1929 12 17.1929ZM15.1 8.19287L8.9 8.19287V6.19287C8.9 4.48287 10.29 3.09287 12 3.09287C13.71 3.09287 15.1 4.48287 15.1 6.19287L15.1 8.19287Z" />
                    </svg>
                }
                <a href='#contributors' className="room-title-block__more">more</a>
            </div>
        </div>
    )
}


function RoomPageProjectInformation({ description }) {
    description = JSON.parse(description);
    return (
        <div className='room__project-info'>
            <p className='room-project-info__title'>Project Information</p>
            <div className='room-project-info__info-wrapper'>
                {description.map(item => {
                    return (item.type == TEXT ? <RoomPageProjectInformationTextBlock item={item} />
                        : item.type == MARKDOWN ? <RoomPageProjectInformationMarkdownBlock item={item} />
                            : item.type == GIT_GIST ? <RoomPageProjectInformationGistBlock item={item} />
                                : null)
                })}
            </div>
        </div>
    )
}

function RoomPageProjectInformationTextBlock({ item }) {
    return (
        <div className='room-project-info__item room-project-info__text-item'>{item.content}</div>
    )
}

function RoomPageProjectInformationMarkdownBlock({ item }) {
    return (
        <div className='room-project-info__item room-project-info__markdown-item'>
            <MarkdownPreview markdown={item.content} />
        </div>
    )
}

function RoomPageProjectInformationGistBlock({ item }) {

    const iframeRef = useRef(null);
    const [failed, setFailed] = useState(false);
    const [loading, setLoading] = useState(true);

    const iframeOnLoad = () => {
        const iframe = document.getElementById(`gist-${item.content}`);
        const innerDoc = iframe.contentWindow.document;
        const gist = innerDoc.querySelector('.gist-file');
        if (gist === null) {
            setFailed(true);
        }
        setLoading(false);
    }


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
    <body onload="parent.document.getElementById('gist-${item.content}').style.height=document.body.scrollHeight + 'px'">
        <script type="text/javascript" src="${item.content}.js"></script>
    </body>
</html>
    `


    return (
        <div className='room-project-info__item room-project-info__gist-item'>
            {loading ? <div className='room-gist-block__loader'><Loader /></div> : null}
            {failed ?
                <div className='room-gist-block__failed'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                    </div>
                    <span>gist not found</span>
                </div>
                :
                <iframe
                    ref={iframeRef}
                    onLoad={() => iframeOnLoad()}
                    frameBorder="0"
                    className='iframe'
                    id={`gist-${item.content}`}
                    srcDoc={iframeDoc}>
                </iframe>
            }
        </div>
    )
}

function RoomPageWorkspaces({ workspaces }) {
    return (
        <div id='contributors' className='room__editors-block'>
            <p className='room-editors-block__title'>Project Editors</p>
            {workspaces.length == 0 ? 
                <p className='room-editors-block__no-editors'>No editors</p>
                :
                <div className='room-editors-block__editors'>
                    {workspaces.map(workspace => <RoomItemTwo user={workspace.user} data={workspace} />)}
                </div>
            }
        </div>
    )
}


function RoomPageContributors({ contributors }) {
    return (
        <div id='contributors' className='room__contributors-block'>
            <p className='room-contributors-block__title'>Project contributors</p>
            <div className='room-contributors-block__contributors'>
                {contributors.slice(0).reverse().map(user => <RoomPageContributor user={user} />)}
            </div>
        </div>
    )
}

function RoomPageContributor({ user }) {
    return (
        <div className='room-contributor'>
            <img src={`http://localhost:8080/api/v.1/images/${user.image}`} />
        </div>
    )
}

export default RoomPage;