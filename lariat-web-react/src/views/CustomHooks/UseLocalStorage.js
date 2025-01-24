import { useState, useEffect } from 'react';


function keySave(key, initialValue){
    console.log(key);
    console.log(initialValue);
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue){
        return savedValue
    }

    if (initialValue instanceof Function){
        return initialValue()
    }

    return initialValue;

}

export default function useLocalStorage(key, initialValue){
    // console.log(key)
    // console.log(initialValue)

    const [value, setValue] = useState(() => {
    return keySave(key, initialValue)
})
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value])


    return [value,setValue]
}
