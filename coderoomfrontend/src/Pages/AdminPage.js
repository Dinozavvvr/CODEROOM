import React, { useEffect } from 'react';
import StandartHeader from '../Components/StandartHeader';
import StandartFooter from '../Components/StandartFooter';
import '../css/admin.css';
import '../css/admin-page-block.css';

// icons
import usersIcon from '../images/icons/people_white.svg';
import roomsIcon from '../images/icons/room-icon.svg';
import ratingIcon from '../images/icons/trending_up_white.svg';
import activitiesIcon from '../images/icons/bolt_white.svg';
import { useHistory } from 'react-router';
import axios from 'axios';
import useCookie from '../hooks/CookiesHook';

function AdminPage() {

    const history = useHistory();
    const noAuthorities = () => {
        history.push('/login')
    }

    const headers = { Authorization: useCookie('oAuthToken') };

    useEffect(() => {
        axios.get('http://localhost:8080/api/v.1/admin', { headers })
            .then(response => console.log(response))
            .catch(err => noAuthorities());
    }, [])

    const redirectToAdminUsers = () => {
        history.push('/admin/users')
    }

    return (
        <React.Fragment>
            <StandartHeader authenticated={true}/>
            <div className={'admin-page-main'}>
                <h2 className={'admin-page-main__title'}>
                    Welcome, Admin
                    </h2>
                <div className={'admin-page-main__grid admin-page-grid'}>

                    {/* users */}
                    <div onClick={() => redirectToAdminUsers()} className={'admin-page-block'}>
                        <p className={'admin-page-block__text'}>
                            Users
                        </p>
                        <div className={'admin-page-block__mini-block'}>
                            <img src={usersIcon} className='admin-page-block__mini-block-img' alt='icon' />
                            <p className={'admin-page-block__mini-block-text'}>
                                open users panel
                            </p>
                        </div>
                    </div>

                    {/* rooms */}
                    <div className={'admin-page-block'}>
                        <p className={'admin-page-block__text'}>
                            Rooms
                        </p>
                        <div className={'admin-page-block__mini-block  admin-page-block-right'}>
                            <p className={'admin-page-block__mini-block-text'}>
                                open rooms panel
                            </p>
                            <img src={roomsIcon} className='admin-page-block__mini-block-img' alt='icon' />
                        </div>
                    </div>

                    {/* rating */}
                    <div className={'admin-page-block'}>
                        <p className={'admin-page-block__text'}>
                            Ratings
                        </p>
                        <div className={'admin-page-block__mini-block admin-page-block-bottom'}>
                            <img src={ratingIcon} className='admin-page-block__mini-block-img' alt='icon' />
                            <p className={'admin-page-block__mini-block-text'}>
                                show ratings
                            </p>
                        </div>
                    </div>

                    {/* activities */}
                    <div className={'admin-page-block'}>
                        <p className={'admin-page-block__text'}>
                            Activities
                        </p>
                        <div className={'admin-page-block__mini-block admin-page-block-right admin-page-block-bottom'}>
                            <p className={'admin-page-block__mini-block-text'}>
                                show activities
                            </p>
                            <img src={activitiesIcon} className='admin-page-block__mini-block-img' alt='icon' />
                        </div>
                    </div>
                    <div className={'admin-page-grid__circle'}>
                    </div>
                </div>
            </div>
            <StandartFooter />
        </React.Fragment>
    );
}

export default AdminPage;