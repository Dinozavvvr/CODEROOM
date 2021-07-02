import React, { useState } from 'react';
import '../css/login.css';
import contentLogo from '../images/icons/CR-green-ico.svg'
import StandartHeader from '../Components/StandartHeader';
import StandartFooter from '../Components/StandartFooter';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const initialState = {
    nickname: "",
    password: "",
}

export default class LogInPage extends React.Component {

    constructor(props) {
        super(props);
        this.cookies = new Cookies();
        this.history = props.history;
        this.state = initialState;
        this.badResponse = this.badResponse.bind(this);
        this.login = this.login.bind(this);
    }

    updateUserData = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
        console.log(this.state);
    }

    badResponse() {
        this.setState(initialState)
    }

    login() {
        const user = {
            nickname: this.state.nickname,
            password: this.state.password
        }
        axios.post(`http://localhost:8080/api/v.1/login`, user)
            .then(res => {
                if (res.status === 200) {
                    this.cookies.set('oAuthToken', res.data.token, { path: '/' });
                    this.history.push('/account')
                }
            }).catch(this.badResponse)
    }

    render() {
        return (
            <React.Fragment>
                <StandartHeader headerContext />
                <div className={'main'}>
                    <div className={'main__left-side'}>
                        <div className={'main__content content'}>
                            <img src={contentLogo} className={'content__image'} alt='content_logo' />
                            <h2 className={'content__title'}>
                                Сreate an account to start development
                            </h2>
                            <p className={'content__text'}>
                                By creating an account, you can create your own rooms and participate in others
                            </p>
                        </div>
                    </div>
                    <div className={'main__right-side'}>
                        <form className={'main__form form login-main__form-back'}>
                            <h3 className={'form__title'}>Login</h3>
                            <div className={'form__input-wrapper'}>
                                <input onChange={this.updateUserData} type='text' className={'form__input'} placeholder='nickname' name='nickname' value={this.state.nickname}/>
                                <input onChange={this.updateUserData} type='password' className={'form__input'} placeholder='password' name='password' value={this.state.password}/>
                                <span type="checkbox" className={'form__remember'}>remember me</span>
                                <button onChange={this.updateUserData} onClick={this.login} type="button" className={'form__button form__input'}>login</button>
                            </div>
                            <NavLink to='/signup' className={'form__to-login'}>I don’t have an account</NavLink>
                        </form>
                        <div className={'main__form-back-1 login-main__form-back'} />
                        <div className={'main__form-back-2 login-main__form-back'} />
                        <span className={'main__form-image'} />
                    </div>
                </div>
                <StandartFooter />
            </React.Fragment>
        )
    }
}
