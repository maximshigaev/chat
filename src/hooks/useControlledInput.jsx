import {useState, useCallback} from 'react';

export const useControlledInput = (setTerm) => {
    const [inputValue, setInputValue] = useState(``);
    const handleChange = useCallback((evt) => {
        setInputValue(evt.target.value);
        setTerm(evt.target.value);
    }, [setTerm]);
    
    return {
        inputValue,
        handleChange
    };
}
