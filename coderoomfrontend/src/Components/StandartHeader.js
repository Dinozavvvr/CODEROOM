import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HeaderContext } from '../contexts/HeaderContext';
import logo from '../images/icons/CODEROOM-white-ico.svg';
import getLanguages from '../Services/LanguagesService';

import '../css/header.css';
// import useHeaderState from '../hooks/HeaderHook';

function StandartHeader({ authenticated }) {
    const { headerState, toggleHeader } = React.useContext(HeaderContext);
    const [burgerState, setBurgerState] = useState(false);
    const [languages, setLanguages] = useState([])

    useEffect(async () => {
        setLanguages(await getLanguages());
    }, [])

    const toggleBurger = () => {
        setBurgerState(!burgerState);
    }

    const toggle = () => {
        if (headerState) {
            setBurgerState(false);
        }
        toggleHeader();
    }

    const selectLanguage = (language) => {
        let changeLanguages = { ...languages };
        changeLanguages[language] = !languages[language];
        setLanguages(changeLanguages);
    }

    return (
        <div className={'header-wrapper'}>
            <div className={`header-blur ${burgerState ? 'open-search ' : ''}`} />
            <div className={`header ${headerState ? ' headerOnClick ' : ''} ${burgerState ? 'open-search ' : ''} `}>
                <div className={`header__menu-items menu-items ${headerState ? ' headerMenuOnClick' : ''}`}>
                    <ul className={'menu-items__left-part'}>
                        <li><NavLink to={authenticated ? '/account' : 'Sign Up'} className={'header__button-green button'}>{authenticated ? 'Profile' : 'Sign Up'}</NavLink></li>
                        <li><NavLink to={authenticated ? '/logout' : '/login'} className={'header__button button'}>{authenticated ? 'Logout' : 'Log In'}</NavLink></li>
                        <li className={'menu-items__rooms'}><a href="#" className={'header__button-green rooms button'}>Rooms</a></li>
                    </ul>
                    <form className={'menu-items__right-part menu-form'}>
                        <input id="search" className={`menu-form__search-input  ${burgerState ? 'open-search ' : ''}`} type="text" name="search"
                            placeholder="Search room ..." />
                        <div onClick={() => toggleBurger()} className={`search-burger ${burgerState ? 'open-search ' : ''}`}>
                            <span className={'search-burger__line'}></span>
                            <span className={'search-burger__line'}></span>
                            <span className={'search-burger__line'}></span>
                        </div>
                    </form>
                </div>
                <div className={`header__search-selector search-selector ${burgerState ? ' open-search' : ''}`}>
                    <div className={'search-selector__selector'}>
                        <p className={'search-selector__title'}>click to choose category</p>
                        <Languages 
                            languages={languages}
                            inputName='search-languages'/>
                    </div>
                </div>
                <img src={logo} onClick={toggle} className={'header__logo'} alt="logo" />
            </div>
        </div>
    );
};

function Languages({ languages }) {
    return (
        <>
            {
                languages.map(language => <LanguageItem language={language} />)
            }
        </>
    )
}

function LanguageItem({ language, inputName }) {
    return (
        <>
        <input type='checkbox'
             id={`h-search-${language.name}`}
             name={inputName} 
             value={language.name}
             className='search-selector__language-input'/>
        <label htmlFor={`h-search-${language.name}`} className='search-selector__language-label'>{language.name}</label>
        </>
    )
}

export default StandartHeader;