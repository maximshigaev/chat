import React, {useState, useContext} from 'react';
import cn from 'classnames';

import {StoreContext} from '../context';

export const useChannelError = (mode, modifier) => {
    const [isChannelError, setIsChannelError] = useState(false);
    const {currentTheme} = useContext(StoreContext);

    const divClass = cn(`channels-error`,
        {'channels-error--rename': modifier === `rename`, 'channels-error--light': currentTheme === `light`});
    
    const errorMessage = (
        <div className={divClass}>
            {mode === `empty` && `Name of the channel is empty`}
            {mode === `long` && `Name is more than 20 characters`}
        </div>
    );
    
    return {
        isChannelError,
        setIsChannelError,
        errorMessage
    };
}
