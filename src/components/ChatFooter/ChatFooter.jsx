import React, {useCallback, useContext} from 'react';
import {observer} from 'mobx-react';

import {TextArea} from '../';
import {StoreContext} from '../../context';

import './ChatFooter.scss';

let currentFileId = 1;

const ChatFooter = observer(() => {
    const {uploadedFiles, setUploadedFiles} = useContext(StoreContext);

    const handleFileInputChange = useCallback((evt) => {
        const reader = new FileReader();

        if (evt.target.files.length) {
            reader.readAsDataURL(evt.target.files[evt.target.files.length - 1]);
            reader.addEventListener(`load`, (evt) => {
                setUploadedFiles([...uploadedFiles, {id: currentFileId++, content: evt.target.result}]);
            });
        }
    }, [setUploadedFiles, uploadedFiles]);

    return (
        <div className="chat-footer">
            {(uploadedFiles.length !== 0) &&
                <div className="chat-footer-files custom-scrollbar custom-scrollbar--hz">
                    {uploadedFiles.map((file) => (
                        <img className="chat-footer-pic" src={file.content} alt={`File-${file.id}`} key={file.id} />
                    ))}
                </div>
            }
            <div className="chat-footer-upload">
                <input className="chat-footer-fileinput" type="file" name="file"
                    onChange={handleFileInputChange}
                />
            </div>
            <button className="chat-voice-btn" title="Record voice" />
            <TextArea />
            <button className="chat-smiles-btn" title="Add smile" />
        </div>
    );
});

export {ChatFooter};
