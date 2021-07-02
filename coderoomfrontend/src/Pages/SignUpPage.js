import React, { useState } from 'react';
import axios from 'axios';
import '../css/signup.css';
import contentLogo from '../images/icons/CR-green-ico.svg'
import StandartHeader from '../Components/StandartHeader';
import StandartFooter from '../Components/StandartFooter';
import { NavLink, withRouter } from 'react-router-dom';

const initialState = {
    email : "",
    nickname: "",
    name: "",
    surname: "",
    password: ""
}

class SignUpPage extends React.Component {

    constructor(props) {
        super(props);
        this.history = props.history;
        this.state = initialState;
        this.badResponse = this.badResponse.bind(this)
        this.saveUser = this.saveUser.bind(this)
    }

    updateUserData = (event) => {   
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
        console.log(this.state);
    }

    badResponse() {
        this.setState(initialState)
    }

    saveUser() {
        const user = {
            email: this.state.email,
            nickname: this.state.nickname,
            name: this.state.name,
            surname: this.state.surname,
            password: this.state.password,
        }
        axios.post(`http://localhost:8080/api/v.1/registration`, user)
        .then(res => {
            if (res.status == 200) {
                this.history.push('/login')
            }
        }).catch(this.badResponse)
    }

    render() {
    return (
        <React.Fragment>
            <StandartHeader/>
            <div className={'main'}>
                <div className={'main__left-side'}>
                    <div className={'main__content content'}>
                        <img src={contentLogo} className={'content__image'} alt='content_logo'/>
                        <h2 className={'content__title'}>
                            Сreate an account to start development 
                        </h2>
                        <p className={'content__text'}>
                            By creating an account, you can create your own rooms and participate in others
                        </p>
                    </div>   
                </div>   
                <div className={'main__right-side'}>
                    <form className={'main__form form'}>
                        <h3 className={'form__title'}>Registration</h3>
                        <div className={'form__input-wrapper'}>
                            <input onChange={this.updateUserData} type='text' className={'form__input'} placeholder='email' name='email' value={this.state.email}/>
                            <input onChange={this.updateUserData} type='text' className={'form__input'} placeholder='nickname' name='nickname' value={this.state.nickname}/>
                            <input onChange={this.updateUserData} type='text' className={'form__input'} placeholder='name' name='name' value={this.state.name}/>
                            <input onChange={this.updateUserData} type='text' className={'form__input'} placeholder='surname' name='surname' value={this.state.surname}/>
                            <input onChange={this.updateUserData} type='password' className={'form__input'} placeholder='password' name='password' value={this.state.password}/>
                            <button onClick={this.saveUser}type="button" className={'form__button form__input'}>sign up</button>
                        </div>
                        <NavLink to='/login' className={'form__to-login'}>I already have an account</NavLink>
                    </form>
                    <div className={'main__form-back-1'}/>
                    <div className={'main__form-back-2'}/>
                    <span className={'main__form-image'}/>
                </div>
            </div>
            <StandartFooter/>
        </React.Fragment>
    )}
}


export default withRouter(SignUpPage)