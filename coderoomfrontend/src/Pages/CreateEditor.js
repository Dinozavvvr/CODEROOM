import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StandartFooter from '../Components/StandartFooter';
import StandartHeader from '../Components/StandartHeader';
import getLanguages from '../Services/LanguagesService';

/* import styles */
import '../css/create-editor.css';
import { createWorkspace, getCreteWorkspacePage } from '../Services/WorkspaceService';
import useCookie from '../hooks/CookiesHook';
import { useHistory } from 'react-router';
import Loader from '../Components/Loader';
import { createWebWorkspace } from '../Services/WebWorkspaceService';

const DARK = 'DARK';
const LIGHT = 'LIGHT';

const WEB = 'WEB'
const DEFAULT = 'DEFAULT';

function CreateEditor(params) {

    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [theme, setTheme] = useState(DARK)
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState(DEFAULT)
    const headers = { Authorization: useCookie('oAuthToken') };
    const history = useHistory();

    useEffect(async () => {
        const response = await getCreteWorkspacePage(headers);

        if (response) {
            setLanguages(await getLanguages());
            setLoading(false);
        } else {
            history.push('/account')
        }

    }, [])

    const redirectToWorkspace = data => {
        history.push({
            pathname: `/workspace/${data.id}`,
            state: {
                workspace: data
            }
        })
    }

    const redirectToWebWorkspace = data => {
        history.push({
            pathname: `/web-workspace/${data.id}`,
            state: {
                webWorkspace: data
            }
        })
    }

    const createEditor = () => {
        if (type === DEFAULT) {
            const workspaceDto = {
                title: title,
                description: description,
                theme: theme,
                language: selectedLanguage
            }
            createWorkspace(workspaceDto, headers)
                .then(data => redirectToWorkspace(data))
        } else {
            const webWorkspaceDto = {
                title: title,
                description: description,
                theme: theme
            }
            console.log(webWorkspaceDto);
            createWebWorkspace(webWorkspaceDto, headers)
                .then(response => redirectToWebWorkspace(response.data))

        }

    }


    return (
        <React.Fragment>
            {loading ?
                <div className='admin-users-page__loader-wrapper'>
                    <Loader />
                </div>
                : <>
                    <StandartHeader authenticated={true} />
                    <div className='create-editor__main'>
                        <h2 className='create-editor__title'>Welcome to Initializer</h2>
                        <form className='create-editor__form create-editor-form'>
                            <p className='create-editor-from__text'>Please select the required settings</p>
                            <p className='create-editor-form__title'>Title</p>
                            <input
                                className='create-editor-form__text-input'
                                value={title}
                                onChange={event => setTitle(event.target.value)}
                                placeholder='example project' />
                            <p className='create-editor-form__description'>Description</p>
                            <input
                                className='create-editor-form__text-input'
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                                placeholder='example description by coderoom.com' />
                            <div className='create-editor-form__select-type'>
                                <input
                                    onClick={() => setType(DEFAULT)}
                                    id='default'
                                    defaultChecked
                                    type='radio'
                                    name='type' />
                                <label htmlFor='default' className='create-editor-form__type-button'>default</label>
                                <input
                                    onClick={() => setType(WEB)}
                                    id='web'
                                    type='radio'
                                    name='type' />
                                <label htmlFor='web' className='create-editor-form__type-button'>web</label>
                            </div>
                            {type === DEFAULT ?
                                <>
                                    <p className='create-editor-form__language'>Language</p>
                                    <div className='create-editor-form__languages'>
                                        <Languages languages={languages} onSelect={setSelectedLanguage} />
                                    </div>

                                </>
                                : null}
                            <p className='create-editor-form__theme'>Theme</p>
                            <div className='create-editor-from__themes'>
                                <input
                                    onClick={() => setTheme(LIGHT)}
                                    name='theme'
                                    id='light-theme'
                                    type='radio' />
                                <label htmlFor='light-theme' className='create-editor-form__light-theme-input'>light</label>
                                <input
                                    defaultChecked
                                    onClick={() => setTheme(DARK)}
                                    name='theme'
                                    id='dark-theme'
                                    type='radio' />
                                <label htmlFor='dark-theme' className='create-editor-form__dark-theme-input'>dark</label>
                            </div>
                            <button
                                type='button'
                                className='create-editor-form__create'
                                onClick={() => createEditor()}>
                                create
                            </button>
                        </form>
                    </div>
                    <StandartFooter />
                </>}

        </React.Fragment>
    );
}

function Languages({ languages, onSelect }) {
    return (
        <>
            {
                languages.map(language => <LanguageItem language={language} onChange={onSelect} />)
            }
        </>
    )
}

function LanguageItem(props) {
    const { language, onChange } = props;

    return (
        <>
            <input
                type='radio'
                id={`cr-radio-${language.name}`}
                value={language.name}
                name='language'
                className='create-editor-form__language-input' />
            <label
                htmlFor={`cr-radio-${language.name}`}
                onClick={() => onChange(language)}
                className='create-editor-form__language-label'>{language.name}</label>
        </>
    )
}

export default CreateEditor;

