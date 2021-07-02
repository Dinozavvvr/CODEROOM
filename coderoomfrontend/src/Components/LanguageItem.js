import React, { useState } from 'react';

/* impopt styles */
import '../css/language-item.css';

function LanguageItem(props) {
    const {
        language,
        onChange,
        className
    } = props

    return (
        <>
        <input
            type='checkbox'
            id={`cr-radio-${language.name}`}
            value={language.name}
            name='language'
            className='create-editor-form__language-input' />
        <label
            htmlFor={`cr-radio-${language.name}`}
            onClick={() => onChange(language)}
            className={`language-item ${className}`}>{language.name}</label>
        </>
    )
}

export default LanguageItem;