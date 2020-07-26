import React, {useContext, useState, useEffect, useCallback} from 'react';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';

import './TextArea.scss';

let isTouched = false;

const TextArea = observer(() => {
    const {currentChannel, createMessage} = useContext(StoreContext);
    const [textAreaValue, setTextAreaValue] = useState(`Message in #${currentChannel.title}`);

    useEffect(() => {
        isTouched = false;
        setTextAreaValue(`Message in #${currentChannel.title}`)
    }, [currentChannel.title]);

    const handleChange = useCallback((evt) => setTextAreaValue(evt.target.value), []);
    const handleKeyDown = useCallback((evt) => {
        if (evt.keyCode === 13) {
            evt.preventDefault();
            setTextAreaValue('');

            createMessage({
                channelId: currentChannel.id,
                date: new Date().toISOString(),
                text: textAreaValue,
                author: {
                    firstName: `Maxim`,
                    lastName: `Shigaev`,
                    avatar: `https://s3.amazonaws.com/uifaces/faces/twitter/raphaelnikson/128.jpg`,
                }
            }, currentChannel.id);
        }
    }, [createMessage, currentChannel.id, textAreaValue]);
    
    const handleFocus = useCallback(() => {
        if (!isTouched) {
            setTextAreaValue('');
        }
        
        isTouched = true;
    }, []);

    return (
        <textarea className="textarea custom-scrollbar" value={textAreaValue} onChange={handleChange}
            onKeyDown={handleKeyDown} onFocus={handleFocus}
        />
    );
});

export {TextArea};
