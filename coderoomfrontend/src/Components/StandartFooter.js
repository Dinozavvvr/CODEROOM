import React from 'react'
import '../css/footer.css'

function StandartFooter() {
    return (
        <div className={'footer-wrapper'}>
            <div className={'footer'}>
                <ul className={'footer__left-part'}>
                    <li><a href="#" className={'footer__button footer-button'}>Facebook</a></li>
                    <li><a href="#" className={'footer__button footer-button'}>Instagram</a></li>
                    <li><a href="#" className={'footer__button footer-button'}>Vk</a></li>
                </ul>
                <div className={'footer__image-wrapper'}>
                    <span className={'footer__animate-image'}></span>
                </div>
                <ul className={'footer__right-part'}>
                    <li><a href="#" className={'footer__button footer-button'}>Support</a></li>
                    <li><a href="#" className={'footer__button footer-button'}>About</a></li>
                    <li><a href="#" className={'footer__button footer-button'}>Documentation</a></li>
                </ul>
            </div>
        </div>
    )
};

export default StandartFooter;