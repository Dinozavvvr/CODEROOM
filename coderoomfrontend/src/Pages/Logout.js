import { useHistory } from 'react-router-dom';
import cookies from '../cookies/Cookies';
import React, { useEffect } from 'react';

function Logout() {
    const history = useHistory();
    useEffect(() => {
        cookies.remove('oAuthToken');
        history.push('/login')
    },[])
    
    return (
        <div/>
    )
}

export default Logout;