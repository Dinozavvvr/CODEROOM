import React, { useState } from 'react';
import '../css/editor.css';

// import styles
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/monokai.css';

import 'codemirror/addon/hint/css-hint.js'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint.css'


import 'codemirror/addon/display/fullscreen.js';
import 'codemirror/addon/display/fullscreen.css';

import 'codemirror/keymap/sublime.js';

import 'codemirror/addon/scroll/simplescrollbars.js';
import 'codemirror/addon/scroll/simplescrollbars.css';

import 'codemirror/addon/fold/foldcode.js';

import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/foldgutter.css';

// import languages

// java / c++ / c / kotlin
import 'codemirror/mode/clike/clike';

// other
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/python/python';

// web
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';

// import controlls
import { Controlled as ControlledEditor } from 'react-codemirror2';

function Editor(props) {

    const hideHeader = () => {
        document.getElementsByClassName('header')[0].classList.toggle('hide-header');
    }

    const [hide, setHide] = useState(false);
    const [editorHeader, setEditorHeader] = useState(false);

    const {
        language,
        editorName,
        value,
        onChange,
        defaults
    } = props

    function handleChange(editor, data, value) {
        onChange(value)
    }

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    const resize = () => {
        let state = hide;
        setHide(!hide);
        if (!state) {
            sleep(300).then(() => {
                setEditorHeader(true);        
            });
        } else {
            sleep(150).then(() => {
                setEditorHeader(false);        
            });
        }
    }

    

    return (
        <div className={`workspace-editor__container ${hide ? 'workspace-editor__hide' : ''}`}>
            <div className={`workspace-editor__header ${editorHeader ? 'workspace-editor__hide' : ''}`}>
                <div className='workspace-editor__title'>
                    {editorName}
                </div>
                <div className={`workspace-editor__buttons ${editorHeader ? 'workspace-editor__hide' : ''}`}>
                    <div className='workspace-editor__button workspace-editor__options'></div>
                    <div className='workspace-editor__button workspace-editor__resize' onClick={() => resize()}></div>
                </div>
            </div>
            <ControlledEditor
                onBeforeChange={handleChange}
                value={value}
                className={`workspace-editor__code-mirror-wrapper code-mirror-wrapper ${editorHeader ? 'workspace-editor__hide' : ''}`}
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    lineNumbers: true,
                    theme: 'monokai',
                    scrollbarStyle: 'overlay',
                    tabindex: 4,
                    cursorBlinkRate: 600,
                    lineWrapping: false,
                    indentUnit: 4,
                    indentWithTabs: 4,
                    foldGutter: true,
                    gutters: ["CodeMirror-linenumbers",
                        "CodeMirror-foldgutter",
                        "CodeMirror-lint-markers"],
                    keyMap: 'sublime',
                    extraKeys: {
                        "F11": function (cm) {
                            hideHeader();
                            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                        },
                        "Esc": function (cm) {
                            hideHeader();
                            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                        }
                    }
                }}
            />
        </div>
    );
}

export default Editor;