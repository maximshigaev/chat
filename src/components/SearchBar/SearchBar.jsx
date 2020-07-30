import React, {useContext} from 'react';

import {StoreContext} from '../../context';
import {useControlledInput} from '../../hooks';

import './SearchBar.scss';

const SearchBar = () => {
    const {setFilterTerm, isMessagesLoading} = useContext(StoreContext);
    const {inputValue, handleChange} = useControlledInput(setFilterTerm);

    return (
        <input className="chat-input" value={inputValue} type="text" placeholder="Search ..." onChange={handleChange} disabled={isMessagesLoading} />
    );
}

export {SearchBar};
