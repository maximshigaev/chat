import React, {useContext, useState, useCallback, useRef, useEffect} from 'react';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';

import './TextArea.scss';

let isEdited = false;

const TextArea = observer(() => {
    const {currentChannel, createMessage, currentProfile, uploadedFiles, setUploadedFiles} = useContext(StoreContext);
    const [textAreaValue, setTextAreaValue] = useState();
    const textAreaRef = useRef();

    useEffect(() => setTextAreaValue(`Message in #${currentChannel.title}`), [currentChannel.title]);

    const handleKeyDown = useCallback((evt) => {
        if ((evt.keyCode === 13 && textAreaRef.current.value && isEdited)
            || (evt.keyCode === 13 && uploadedFiles.length && isEdited)
        ) {
            evt.preventDefault();

            const message = {
                channelId: currentChannel.id,
                date: new Date().toISOString(),
                text: textAreaRef.current.value,
                author: {
                    firstName: `Maxim`,
                    lastName: `Shigaev`,
                    avatar: currentProfile.avatar,
                },
                images: uploadedFiles,
            }
            
            createMessage(message, currentChannel.id);
            setTextAreaValue(``);
            setUploadedFiles([]);
        }
    }, [currentChannel.id, createMessage, currentProfile.avatar, setUploadedFiles, uploadedFiles]);

    useEffect(() => {
        window.addEventListener(`keydown`, handleKeyDown);
        
        return () => window.removeEventListener(`keydown`, handleKeyDown);
    }, [handleKeyDown]);

    const handleChange = useCallback((evt) => {
        setTextAreaValue(evt.target.value.trim());
    }, []);
    
    const handleFocus = useCallback(() => {
        if (!isEdited) {
            setTextAreaValue(``);
        }

        isEdited = true;
    }, []);
    const handleBlur = useCallback(() => {
        if (!textAreaValue) {
            isEdited = false;
            setTextAreaValue(`Message in #${currentChannel.title}`);
        }
    }, [textAreaValue, currentChannel.title]);

    return (
        <textarea className="textarea custom-scrollbar" value={textAreaValue} onChange={handleChange} ref={textAreaRef}
            onBlur={handleBlur} onFocus={handleFocus}
        />
    );
});

export {TextArea};
