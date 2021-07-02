import React, { useState } from 'react';
import Editor from '../Components/Editor';
import '../css/workspace.css';
import StandartHeader from '../Components/StandartHeader';
import Standartfooter from '../Components/StandartFooter';
import { useEffect } from 'react';
import useLocalStorage from '../hooks/UseLocalStorage';
import { useHistory, useRouteMatch } from 'react-router';
import { deleteWebWorkspace, getWebWorkspace, updateWebWorkspace } from '../Services/WebWorkspaceService';
import useCookie from '../hooks/CookiesHook';
import Loader from '../Components/Loader';

function WebWorkspace(params) {

    const [html, setHtml] = useLocalStorage('html', '<!-- html code here -->');
    const [css, setCss] = useLocalStorage('css', '/* css code here */');
    const [javascript, setJavascript] = useLocalStorage('js', '// js code here');
    const [sourceDocument, setSourceDocument] = useState('');
    const [modeClass, setModeClass] = useState('');
    const [fullscreenIframe, setFullscreenIframe] = useState(false);
    const [webWorkspace, setWebWorkspace] = useState({})
    const [loading, setLoading] = useState(true);
    const match = useRouteMatch();
    const headers = { Authorization: useCookie('oAuthToken') };
    const history = useHistory();


    /* choose editor mode */
    const setMode = (id) => {
        switch (id) {
            case 1: {
                setModeClass('');
                break;
            }
            case 2: {
                setModeClass('web-workspace-vertical-mode ');
                break;
            }
            case 3: {
                setModeClass('web-workspace-vertical-mode web-workspace-vertical-mode-left');
                break;
            }
        }
    }

    /* key event listeners */
    const keyEventListener = (event) => {
        /* f2 code is 113 */
        if (event.keyCode == 113) {
            setFullscreenIframe(!fullscreenIframe);
        }
    }

    useEffect(() => {
        getWebWorkspace(match.params.id, headers)
            .then(response => response.data)
            .then(workspace => {
                setWebWorkspace(workspace);
                setHtml(workspace.htmlCode != null ? workspace.htmlCode : '<!-- html code here -->');
                setCss(workspace.cssCode != null ? workspace.cssCode : '/* css code here */');
                setJavascript(workspace.jsCode != null ? workspace.jsCode : '// js code here');
            })
            .then(() => setLoading(false))
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', keyEventListener);
        return () => {
            window.removeEventListener('keydown', keyEventListener);
        };
    })

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSourceDocument(
                `
                <html>
                <style>${css}</style>
                <body>${html}</body>
                <script>${javascript}</script>       
                </html>`);
        }, 250);

        return () => clearTimeout(timeout);
    }, [html, css, javascript])

    useEffect(() => {
        document.body.style.background = "#01E602";
        return (() => {
            document.body.style.background = null;
        })
    }, [])


    const onDelete = () => {
        deleteWebWorkspace(webWorkspace, headers)
            .then(() => history.push('/account'))
    }

    const onSave = () => {
        webWorkspace.htmlCode = html;
        webWorkspace.cssCode = css;
        webWorkspace.jsCode = javascript;
        console.log(webWorkspace)
        updateWebWorkspace(webWorkspace, headers)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }


    return (
        <>
            <StandartHeader authenticated={true} />
            <div className={`web-workspace__main ${fullscreenIframe ? 'fullscreen-mode' : ''}`}>
                {loading ? <div className='web-workspace__loader-wrapper'><Loader className={'workspace-loader'}/></div> :
                    <>
                        <div className="web-workspace__header">
                            <div className="web-worlspace__grid-column web-worlspace__grid-buttons-column">
                                <div className="web-workspace__buttons">
                                    <p className="web-workspace__buttons-title">
                                        options
                                    </p>
                                    <div className="web-workspace__button web-workspace__options" />
                                    <div className="web-workspace__button web-workspace__edit" />
                                    <div className="web-workspace__button web-workspace__panel-mode panel-mode-1" onClick={() => setMode(1)} />
                                    <div className="web-workspace__button web-workspace__panel-mode panel-mode-2" onClick={() => setMode(2)} />
                                    <div className="web-workspace__button web-workspace__panel-mode panel-mode-3" onClick={() => setMode(3)} />
                                    <div onClick={() => onDelete()}  
                                        className="web-workspace__button web-workspace__delete" />
                                    <div onClick={() => onSave()} 
                                        className="web-workspace__button web-workspace__save">save</div>
                                </div>
                            </div>
                            <div className="web-worlspace__grid-column web-worlspace__grid-title-column">
                                <h2 className="web-workspace__title">
                                    welcome to the code editor
                            </h2>
                            </div>
                            <div className="web-worlspace__grid-column web-worlspace__grid-information-column">
                                <div className="web-workspace__information web-workspace-information">
                                    <div className="web-workspace-information__info">
                                        <div className="web-workspace-information__project-info">
                                            <div className="web-workspace-information__lang">web</div>
                                            <div className="web-workspace-information__title">
                                                {webWorkspace.title}
                                            </div>
                                        </div>
                                        <div className="web-workspace-information__author">
                                            {webWorkspace.user.name} {webWorkspace.user.surname}
                                        </div>
                                    </div>
                                    <div className="web-workspace-information__image-side">
                                        <div className="web-workspace-information__image-wrapper">
                                            <img src={`http://localhost:8080/api/v.1/images/${webWorkspace.user.image}`} className="web-workspace-information__image" />
                                        </div>
                                        <span>master</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={modeClass}>
                            <div className={`web-workspace__editors ${modeClass}`}>
                                <Editor
                                    language="xml"
                                    editorName="HTML"
                                    value={html}
                                    onChange={setHtml} />
                                <Editor
                                    language="css"
                                    editorName="CSS"
                                    value={css}
                                    onChange={setCss} />
                                <Editor
                                    language="javascript"
                                    editorName="JS"
                                    value={javascript}
                                    onChange={setJavascript} />
                            </div>
                            <div className={`web-workspace__iflame-wrapper ${modeClass} ${fullscreenIframe ? 'fullscreen-mode' : ''}`}>
                                <iframe id="webFrame"
                                    allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi"
                                    allowfullscreen="true"
                                    allowpaymentrequest="true"
                                    allowtransparency="true"
                                    name="CodePen"
                                    sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                                    srcDoc={sourceDocument}
                                    title="output"
                                    className={`web-workspace__iframe  ${fullscreenIframe ? 'fullscreen-mode' : ''}`}
                                    loading="lazy"></iframe>
                            </div>
                        </div>
                    </>
                }
            </div>
            <Standartfooter />
        </>
    );
}

export default WebWorkspace;