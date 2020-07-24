import React from 'react';

import {TextArea} from '../';

import './ChatFooter.scss';

const ChatFooter = () => (
    <div className="chat-footer">
        <button className="chat-upload-btn" title="Upload file" />
        <button className="chat-voice-btn" title="Record voice" />
        <TextArea />
        <button className="chat-smiles-btn" title="Add smile" />
    </div>
);

export {ChatFooter};
