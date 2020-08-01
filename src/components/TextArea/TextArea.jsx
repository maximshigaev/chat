import React, {useContext, useState, useCallback, useRef, useEffect} from 'react';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';
import {handleKeyDown as onKeyDown} from '../../helpers';

import './TextArea.scss';

let isEdited = false;
let isTouched = false;

const TextArea = observer(() => {
    const {currentChannel, createMessage, onlineUser, uploadedFiles, setUploadedFiles,
        isMessagesLoading
    } = useContext(StoreContext);
    const [textAreaValue, setTextAreaValue] = useState(``);
    const textAreaRef = useRef();

    useEffect(() => setTextAreaValue(`Message in #${currentChannel.title}`), [currentChannel.title]);

    const handleSubmit = useCallback(() => {
        if ((textAreaRef.current.value && isEdited) || uploadedFiles.length) {
            const message = {
                channelId: currentChannel.id,
                date: new Date().toISOString(),
                text: isTouched ? textAreaRef.current.value : ``,
                author: onlineUser,
                images: uploadedFiles,
            }
                
            createMessage(message, currentChannel.id);
            setTextAreaValue(``);
            setUploadedFiles([]);
        }
    }, [currentChannel.id, createMessage, onlineUser, setUploadedFiles, uploadedFiles]);

    const handleKeyDown = useCallback(onKeyDown(handleSubmit), [handleSubmit]);
    const handleClick = useCallback(() => handleSubmit(), [handleSubmit]);

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
        isTouched = true;
    }, []);

    const handleBlur = useCallback(() => {
        if (!textAreaValue) {
            isEdited = false;
        }
    }, [textAreaValue]);

    return (
        <>
            <textarea className="textarea custom-scrollbar" value={textAreaValue} onChange={handleChange}
                ref={textAreaRef} onBlur={handleBlur} onFocus={handleFocus} disabled={isMessagesLoading}
            />
            <button className="textarea-btn" title="Send message" onClick={handleClick} />
        </>
    );
});

export {TextArea};
