import { useEffect, useState } from 'react';
import Cookies from '../cookies/Cookies'

function useHeaderState() {
    const cookies = Cookies;
    const [headerState, setHeaderState] = useState();

    const toggleHeader = () => {
        cookies.set('__header', !headerState, {maxAge: 60 * 60 * 24 * 10});
        setHeaderState(!headerState);
    }

    useEffect(() => {
        const localHeaderState = cookies.get('__header')
        if (localHeaderState) {
            setHeaderState(localHeaderState);
        }
    }, [cookies])

    return ({
        headerState,
        toggleHeader
    })

}

export default useHeaderState;