import React, {useState, useContext} from 'react';

import {StoreContext} from '../../context';

import './SearchBar.scss';

const SearchBar = () => {
    const [inputValue, setInputValue] = useState(``);
    const {setFilterTerm} = useContext(StoreContext);
    const handleChange = (evt) => {
        setInputValue(evt.target.value);
        setFilterTerm(evt.target.value);
    }

    return (
        <input className="chat-input" value={inputValue} type="text" placeholder="Search ..." onChange={handleChange} />
    );
}

export {SearchBar};