import React, {useCallback, useContext, useRef} from 'react';
import {observer} from 'mobx-react';
import cn from 'classnames';

import {TextArea} from '../';
import {StoreContext} from '../../context';

import './ChatFooter.scss';

let currentFileId = 1;

const ChatFooter = observer(() => {
    const {uploadedFiles, setUploadedFiles, currentTheme} = useContext(StoreContext);
    const inputRef = useRef();
    const divClass = cn(`chat-footer-files`, `custom-scrollbar`, `custom-scrollbar--hz`,
        {'custom-scrollbar--themed': currentTheme === `light`});
    const uploadDivClass = cn(`chat-footer-upload`, {'chat-footer-upload--light': currentTheme === `light`});

    const handleFileInputChange = useCallback((evt) => {
        const promises = [];

        if (evt.target.files.length) {
            for (let file of evt.target.files) {
                const promise = new Promise((resolve) => {
                    const reader = new FileReader();

                    reader.readAsDataURL(file);
                    reader.addEventListener(`load`, (evt) => {
                        resolve({id: currentFileId++, content: evt.target.result});
                    });
                });

                promises.push(promise);
            }

            Promise.all(promises)
                .then((files) => setUploadedFiles([...uploadedFiles, ...files]));
        }
    }, [setUploadedFiles, uploadedFiles]);

    return (
        <div className="chat-footer">
            {(uploadedFiles.length !== 0) &&
                <div className={divClass}>
                    {uploadedFiles.map((file) => {
                        const handleClick = () => {
                            const indexToDelete = uploadedFiles.findIndex((uploadedFile) => uploadedFile.id === file.id);

                            setUploadedFiles([...uploadedFiles.slice(0, indexToDelete),
                                ...uploadedFiles.slice(indexToDelete + 1)]);
                        }

                        return (
                            <p className="chat-footer-file" key={file.id}>
                                <button className="chat-footer-reset-btn" title="Remove image" onClick={handleClick} />
                                <img className="chat-footer-pic" src={file.content} alt={`File-${file.id}`} />
                            </p>
                        );
                    })}
                </div>
            }
            <div className={uploadDivClass}>
                <input className="chat-footer-fileinput" type="file" name="file" ref={inputRef}
                    onChange={handleFileInputChange} multiple
                />
            </div>
            <TextArea />
        </div>
    );
});

export {ChatFooter};
