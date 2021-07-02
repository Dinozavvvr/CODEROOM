import React from 'react';

/* import markdown compiller */
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import remarkTypograf from '@mavrin/remark-typograf';
import remarkEmoji from 'remark-emoji'

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {darcula as theme} from 'react-syntax-highlighter/dist/esm/styles/prism';

/* import styles */
import 'github-markdown-css';
import '../../css/room/markdown-editor.css';

function MarkdownPreview(props) {

    const {markdown} = props;
    const plugins = [
        gfm, remarkEmoji, remarkTypograf
    ]

    const components = {
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter style={theme} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
          ) : (
            <code className={className} {...props} />
          )
        }
    }

    return (
        <ReactMarkdown
                    components={components} 
                    remarkPlugins={plugins} 
                    children={markdown}
                    className='markdown-body'/>
    )
}

export default MarkdownPreview;