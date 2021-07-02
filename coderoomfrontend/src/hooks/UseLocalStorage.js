import { useEffect, useState } from 'react';

const PREFIX = 'editor-clone-';

function useLocalStorage(key, initialValue) {
    let prefixedKey = PREFIX + key;
    
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey);

        if (jsonValue != null) {
            return JSON.parse(jsonValue);
        }

        if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    const setKey = key => {
        prefixedKey = PREFIX + key;
    }

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value])

    return [value, setValue, setKey]
}

export default useLocalStorage;