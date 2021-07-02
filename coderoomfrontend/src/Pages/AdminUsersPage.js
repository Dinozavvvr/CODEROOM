import React, { Fragment, useEffect, useState } from 'react';
import StandartHeader from '../Components/StandartHeader'
import StandartFooter from '../Components/StandartFooter'
import AdminUserItem from '../Components/AdminUserItem'
import '../css/admin-users-page.css'
import useCookie from '../hooks/CookiesHook';
import axios from 'axios';
import { useHistory } from 'react-router';
import Loader from '../Components/Loader';

function AdminUsersPage(props) {

    const headers = { Authorization: useCookie('oAuthToken') };
    const [usersFilter, setUsersFilter] = useState({
        hideActive: false,
        hideBanned: false,
        sorted: false
    });

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);

    const history = useHistory();
    const noAuthorities = (err) => {
        console.log(err);
        // history.push('/login');
    }

    const getUsers = () => {
        setLoading(true)
        axios.get('http://localhost:8080/api/v.1/users', { headers })
            .then(response => response.data)
            .then(data => setUsers(data))
            .then(() => sleep(1000))
            .then(() => setLoading(false))
            .catch(err => noAuthorities(err));
    }

    const banAll = () => {
        axios.put('http://localhost:8080/api/v.1/users/all/ban', null, { headers })
            .then(response => response.data)
            .then(() => new Promise(() => getUsers()))
            .then(() => setLoading(false))
            .catch(err => noAuthorities(err));
    }

    const unbanAll = () => {
        axios.put('http://localhost:8080/api/v.1/users/all/unban', null, { headers })
            .then(response => response.data)
            .then(() => new Promise(() => getUsers()))
            .then(() => setLoading(false))
            .catch(err => noAuthorities(err));
    }

    const refreshData = () => {
        setLoading(true);
        setUsersFilter({
            hideActive: false,
            hideBanned: false,
            sorted: false
        })
        getUsers();
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/v.1/admin/users', { headers })
            .then(response => console.log(response))
            .then(getUsers())
            .catch(err => noAuthorities(err));

    }, [])

    const hideBanned = () => {
        setUsersFilter({ ...usersFilter, hideBanned: !usersFilter.hideBanned })
    }
    const hideActive = () => {
        setUsersFilter({ ...usersFilter, hideActive: !usersFilter.hideActive })
    }

    return (
        <Fragment>
            <StandartHeader authenticated={true} />
            <div className={'admin-users-page-main'}>
                <div className={'admin-users-page-main__grid admin-users-page-grid'}>
                    <div className={'admin-users-page-grid__users-block'}>
                        {!loading ? <h3 className={'admin-users-page-grid-users__title'}>
                            Users panel
                        </h3> : null}
                        {((users) => {
                            if (loading) {
                                return (
                                    <div className='admin-users-page__loader-wrapper'>
                                        <Loader />
                                    </div>
                                )
                            }
                            else {
                                return (
                                    users.map(user => {
                                        console.log(user)
                                        return (<AdminUserItem usersFilter={usersFilter} user={user} />)
                                    })
                                )
                            }
                        })(users)}
                    </div>
                    {(() => {
                        if (!loading) {
                            return (
                                <div className={'admin-users-page-grid__options-block'}>
                                    <p className={'admin-users-page-grid-options__title'}>
                                        Options
                                    </p>
                                    <div className={'admin-users-page-grid-options__content'}>
                                        <div className={'admin-users-page-grid-options__wrapper'}>
                                            <p className={'admin-users-page-grid-options__hide'}>hide</p>
                                            <input id='active' type='checkbox' className='admin-users-page-grid-options-content__checkbox' />
                                            <label onClick={() => hideActive()} id='active-label' for='active'>active</label>
                                            <input id='banned' type='checkbox' className='admin-users-page-grid-options-content__checkbox' />
                                            <label onClick={() => hideBanned()} id='banned-label' for='banned'>banned</label>
                                            <input id='sorted' type='checkbox' className='admin-users-page-grid-options-content__checkbox' />
                                            <label id='sorted-label' for='sorted'>sorted</label>
                                            <button className="admin-users-page-grid-options__button">use</button>
                                            <button className="admin-users-page-grid-options__button" onClick={() => refreshData()}>refresh</button>
                                            <button className="admin-users-page-grid-options__button" onClick={() => banAll()}>ban all</button>
                                            <button className="admin-users-page-grid-options__button" onClick={() => unbanAll()}>unban all</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })()}
                </div>
            </div>
            <StandartFooter />
        </Fragment>
    )
}

export default AdminUsersPage;