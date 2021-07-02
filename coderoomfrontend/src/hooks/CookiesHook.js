import cookies from '../cookies/Cookies';

function useCookie(cookieName) {
    return cookies.get(cookieName);
};

export default useCookie;