import cookies from '../cookies/Cookies'
import jwt_decode from "jwt-decode";

function useAuthentication(cookieName) {

    const token = cookies.get(cookieName)
    let roles = ''
    let nickname = ''
	console.log(token)
    if (typeof token != 'undefined') {

        const data = jwt_decode(token);
        roles = data.authorities;
        roles = roles.split(',')
        nickname = data.sub;
    } 

    const getRoles = () => {
        return roles;
    }

    const isAdmin = () => {
        for (let i = 0; i < roles.length; i++) {
            console.log(roles[i])
            if (roles[i] == 'ADMIN') {
                return true;
            }
        }
        return false;
    }

    return {
        getRoles,
        isAdmin
    }
}

export default useAuthentication;