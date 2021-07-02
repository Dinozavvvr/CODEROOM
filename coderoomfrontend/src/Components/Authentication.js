import cookies from '../cookies/Cookies';
import jwt_decode from "jwt-decode";

class Authentication {
    constructor (cookieName) {
        this.roles = '';
        this.nickname = '';
        this.token = cookies.get(cookieName);
		console.log(this.token);
        this.init = this.init.bind(this);
        this.init(this.token);
    }

    init(token) {
		if (typeof token != 'undefined') {
            const data = jwt_decode(token);
            this.roles = data.authorities;
            this.nickname = data.sub;
        }
    }

    getToken() {
        return this.token;
    }

    getRoles() {
        return this.roles;
    }
}

export default Authentication;