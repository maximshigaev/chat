import React, {useState} from 'react';
import cn from 'classnames';


export const useChannelError = (mode, modifier) => {
    const [isChannelError, setIsChannelError] = useState(false);

    const divClass = cn(`channels-error`, {'channels-error--rename': modifier === `rename`});
    
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
