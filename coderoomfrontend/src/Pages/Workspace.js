import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router";
import Editor from "../Components/Editor";
import StandartFooter from "../Components/StandartFooter";
import StandartHeader from "../Components/StandartHeader";
// import { default as WorkspaceService } from '../Services/WorkspaceService';
import { getWorkspace, deleteWorkspace, updateWorspace } from '../Services/WorkspaceService';
import useLocalStorage from "../hooks/UseLocalStorage";
import useCookie from "../hooks/CookiesHook";


/* import styles */
import '../css/workspace.css';
import LanguageItem from "../Components/LanguageItem";
import e from "cors";


const PREFIX = 'code-copy-';

function Workspace(props) {

    const headers = { Authorization: useCookie('oAuthToken') };
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const match = useRouteMatch();
    const history = useHistory();

    // language
    const [language, setLanguage] = useState({});

    // workspace
    const [workspace, _setWorkspace] = useState(null);
    const workspaceRef = useRef(workspace);
    const setWorkspace = data => {
        workspaceRef.current = data;
        _setWorkspace(data);
    }

    // code
    const [code, _setCode] = useState(null);
    const codeRef = useRef(code);
    const setCode = data => {
        codeRef.current = data;
        _setCode(data);
    }


    useEffect(() => {
        getWorkspace(match.params.id, headers)
            .then(data => setWorkspace(data))
            .then(() => setLoading(false))
        console.log(match.params.id)
    }, []);

    useEffect(() => {
        if (workspace != null) {
            setLanguage(workspace.language);
            setCode(workspace.code);
        }
    }, [workspace])

    useEffect(() => {
        document.body.style.background = "#01E602";
        return (() => {
            document.body.style.background = null;
        })
    }, [])

    useEffect(() => {
        document.addEventListener("keydown", function (e) {
            if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.code == "KeyS") {
                e.preventDefault();
                let workspace = workspaceRef.current;
                workspace.code = codeRef.current;
                updateWorspace(workspace, headers);
            }
        }, false);
    }, [])


    const onDelete = () => {
        deleteWorkspace(workspace, headers)
            .then(isOkay => {
                if (isOkay) {
                    history.push('/account');
                }
            })
    }

    const onSave = () => {
        workspace.code = code;
        updateWorspace(workspace, headers)
            .then(
                isOkay => {
                    if (isOkay) {
                        console.log(isOkay)
                    }
                }
            )
    }



    return (
        <>
            {(() => {
                if (loading) {
                    return (
                        <div className='admin-users-page__loader-wrapper'>
                        </div>
                    )
                }
                else {
                    return (
                        <>
                            <StandartHeader authenticated={true} />
                            <div className='web-workspace__main'>
                                <div className="web-workspace__header">
                                    <div className="web-worlspace__grid-column web-worlspace__grid-buttons-column">
                                        <div className="web-workspace__buttons">
                                            <p className="web-workspace__buttons-title">
                                                options
                                        </p>
                                            <div className="web-workspace__button web-workspace__options" />
                                            <div className="web-workspace__button web-workspace__edit" />
                                            <div
                                                onClick={() => onDelete()}
                                                className="web-workspace__button web-workspace__delete" />
                                            <div
                                                onClick={() => onSave()}
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
                                                    <div className="web-workspace-information__lang">{workspace.language.name}</div>
                                                    <div className="web-workspace-information__title">
                                                        {workspace.title}
                                                    </div>
                                                </div>
                                                <div className="web-workspace-information__author">
                                                    {workspace.user.name} {workspace.user.surname}
                                                </div>
                                            </div>
                                            <div className="web-workspace-information__image-side">
                                                <div className="web-workspace-information__image-wrapper">
                                                    <img src={`http://localhost:8080/api/v.1/images/${workspace.user.image}`} className="web-workspace-information__image" />
                                                </div>
                                                <span>master</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='workspace__editor'>
                                    <Editor
                                        language={language.type}
                                        editorName={language.name}
                                        value={code}
                                        onChange={setCode} />
                                </div>
                            </div>
                            <StandartFooter />
                        </>)
                }
            })()}
        </>
    )
}

export default Workspace;