import React, {useContext, useState, useEffect} from 'react';
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

    const handleChange = (evt) => setTextAreaValue(evt.target.value);
    const handleKeyDown = (evt) => {
        if (evt.keyCode === 13) {
            evt.preventDefault();

            createMessage({
                channelId: currentChannel.id,
                date: new Date(),
                text: textAreaValue,
                author: {
                    firstName: `Maxim`,
                    lastName: `Shigaev`,
                    avatar: `https://s3.amazonaws.com/uifaces/faces/twitter/raphaelnikson/128.jpg`,
                }
            }, currentChannel.id);
        }
    }
    const handleFocus = () => {
        if (!isTouched) {
            setTextAreaValue('');
        }
        
        isTouched = true;
    }

    return (
        <textarea className="textarea custom-scrollbar" value={textAreaValue} onChange={handleChange}
            onKeyDown={handleKeyDown} onFocus={handleFocus}
        />
    );
});

export {TextArea};
