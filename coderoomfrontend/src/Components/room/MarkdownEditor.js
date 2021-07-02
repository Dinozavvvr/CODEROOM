import React, { useState } from 'react'

/* imporot editor */
import { Controlled as ControlledEditor } from 'react-codemirror2'

/* editor language */
import 'codemirror/mode/markdown/markdown';

/* editor setings */
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/theme/xq-light.css';
import 'codemirror/keymap/sublime.js';
import 'codemirror/addon/scroll/simplescrollbars.js';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/display/fullscreen.js';
import 'codemirror/addon/display/fullscreen.css';


function MarkdownEditor(props) {

    const {
        text,
        onChange
    } = props;

    function handleChange(editor, data, value){
        onChange(value)
    }

    return (
        <>
            <ControlledEditor
                onBeforeChange={handleChange}
                value={text}
                className={'create-room-builder__markdown-editor'}
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: 'markdown',
                    lineNumbers: true,
                    theme: 'xq-light',
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
                            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                        },
                        "Esc": function (cm) {
                            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                        }
                    }
                }}
            />
        </>
    )
}

export default MarkdownEditor;