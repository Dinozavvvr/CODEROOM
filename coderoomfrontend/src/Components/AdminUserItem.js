import axios from 'axios';
import react, { useEffect, useState } from 'react';
import '../css/admin-users-page.css';
import useCookie from '../hooks/CookiesHook';


function AdminUserItem(props) {

    const [state, setState] = useState(props.user);
    const headers = { Authorization: useCookie('oAuthToken') };

    const changeState = (user) => {
        if (state.state == 'ACTIVE') {
            axios.put(`http://localhost:8080/api/v.1/users/${user.id}/ban`, null, { headers })
            .then(res => setState(res.data))
        } else {
            axios.put(`http://localhost:8080/api/v.1/users/${user.id}/unban`,null, { headers })
            .then(res => setState(res.data))
        }
    }

    if (props.usersFilter.hideBanned && state.state == 'BANNED') {
        return(<></>)
    }
    if (props.usersFilter.hideActive && state.state == 'ACTIVE') {
        return(<></>)
    }

    return(
        <div className={'admin-users-page__user admin-users-page-user'}>
            <div className={'admin-users-page-user__image-wrapper'}>
                {state.image == null ? '' :
                    <img className={'admin-users-page-user__image'}
                        src={`http://localhost:8080/api/v.1/images/${state.image}`}/>
                }
                
            </div>
            <div className={'admin-users-page-user__info'}>
                <p className={'admin-users-page-user__nickname'}>
                    {state.nickname}
                </p>
                <p className={'admin-users-page-user__fio'}>
                    {state.name} {state.surname}
                </p>
                <div className={'admin-users-page-user__dop-info'}>
                    <p className={'admin-users-page-user__email'}>
                        email: {state.email}
                    </p>
                    <p className={'admin-users-page-user__roles'}>
                        roles: {state.roles.map(role => <span>{role.name} </span>)}
                    </p>
                </div>
            </div>
            <div className={'admin-users-page-user__buttons-wrapper'}>
                <div className={'admin-users-page-user__button'} onClick={() => changeState(state)}>
                    {state.state == 'BANNED' ? 'unban' : 'ban'}
                </div>  
            </div>
        </div>
    )
}

export default AdminUserItem;