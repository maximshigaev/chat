import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react';
import cn from 'classnames';

import {StoreContext} from '../../context';
import {useControlledInput} from '../../hooks';

import './SearchBar.scss';

const SearchBar = observer(() => {
    const {setFilterTerm, isMessagesLoading, currentChannel, currentTheme} = useContext(StoreContext);
    const {inputValue, handleChange} = useControlledInput(setFilterTerm);
    const inputClass = cn(`chat-input`, {'chat-input--light': currentTheme === `light`});

    useEffect(() => {
        handleChange({target: {value: ``}});
        setFilterTerm(``);
    }, [handleChange, currentChannel.title, setFilterTerm]);

    return (
        <input className={inputClass} value={inputValue} type="text" placeholder="Search..."
            onChange={handleChange} disabled={isMessagesLoading} />
    );
});

export {SearchBar};
