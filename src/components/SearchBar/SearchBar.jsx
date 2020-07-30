import React, {useContext, useEffect, useRef} from 'react';

import {StoreContext} from '../../context';
import {useControlledInput} from '../../hooks';

import './SearchBar.scss';

const SearchBar = () => {
    const {setFilterTerm, isMessagesLoading, currentChannel} = useContext(StoreContext);
    const {inputValue, handleChange} = useControlledInput(setFilterTerm);
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.value = ``;
        setFilterTerm(``);
    }, [handleChange, currentChannel.title, setFilterTerm]);

    return (
        <input className="chat-input" value={inputValue} type="text" placeholder="Search ..."
            onChange={handleChange} disabled={isMessagesLoading} ref={inputRef} />
    );
}

export {SearchBar};
