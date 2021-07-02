import StandartFooter from "../Components/StandartFooter";
import StandartHeader from "../Components/StandartHeader";
import useCookie from "../hooks/CookiesHook";

import '../css/not-found.css';

function NotFound(props) {

    const auth = useCookie('oAuthToken') == null ? false : true;

    return (
        <>
            <StandartHeader authenticated={auth} />
            <Body />
            <StandartFooter />
        </>
    )
}

function Body(params) {
    return (
        <div className='not-found__main'>
            <div className='not-found__text-wrapper'>
                <span>1 |</span>
                <div className='not-found__typing-text'>
                    Sorry, Page not found...
                </div>
            </div>
        </div>
    )
}

export default NotFound;