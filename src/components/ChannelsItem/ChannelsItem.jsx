import React, {useContext, useCallback, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {NavLink, useLocation, useHistory} from 'react-router-dom';
import {observer} from 'mobx-react';
import cn from 'classnames'

import {StoreContext} from '../../context';
import {useControlledInput, useChannelError} from '../../hooks';
import {handleKeyDown as onKeyDown} from '../../helpers';

import './ChannelsItem.scss';

const ChannelsItem = observer(({channel}) => {
    const {setUploadedFiles, setIsMenuOpened, setIsMobileMenuOpened, deleteChannel,
        setCurrentChannel, updateChannel, currentTheme
    } = useContext(StoreContext);
    const currentChannelId = useLocation().pathname.slice(1);
    const history = useHistory();
    const linkClass = cn(`channels-link`, {'channels-link--light': currentTheme === `light`});
    const inputClass = cn(`channels-item-input`, {'channels-item-input--light': currentTheme === `light`});

    const [isChannelEditing, setIsChannelEditing] = useState(false);
    const {inputValue, handleChange} = useControlledInput();
    const editBtnClass = cn(`channels-item-btn`, `channels-item-btn--rename`,
        {'channels-item-btn--opened': isChannelEditing, 'channels-item-btn--light': currentTheme === `light`});
    const {isChannelError: isEmptyError, setIsChannelError: setIsEmptyError, errorMessage: emptyMessage}
        = useChannelError(`empty`, `rename`);
    const {isChannelError: isLongError, setIsChannelError: setIsLongError, errorMessage: longMessage}
        = useChannelError(`long`, `rename`);

    const handleLinkClick = useCallback(() => {
        if (+currentChannelId !== channel.id) {
            setUploadedFiles([]);
            setIsMenuOpened(false);
            setIsMobileMenuOpened(false);
        }
    }, [setUploadedFiles, channel.id, currentChannelId, setIsMenuOpened, setIsMobileMenuOpened]);
    const renameInputRef = useRef();
    const handleFocus = useCallback(() => {
        setIsEmptyError(false);
        setIsLongError(false);
    }, [setIsEmptyError, setIsLongError]);

    const handleRenameBtnClick = useCallback(() => {
        setIsEmptyError(false);
        setIsLongError(false);
        setIsChannelEditing((isEditing) => !isEditing);
    }, [setIsEmptyError, setIsLongError]);
    const handleOkBtnClick = useCallback(() => {
        if (!inputValue.trim()) {
            setIsEmptyError(true);
            renameInputRef.current.blur();
        } else if (inputValue.trim().length > 20) {
            setIsLongError(true);
            renameInputRef.current.blur();
        } else {
            updateChannel({
                ...channel,
                title: inputValue.trim(),
            }, channel.id, `rename`);
            setIsEmptyError(false);
            setIsLongError(false);
        }
    }, [updateChannel, channel, inputValue, setIsEmptyError, setIsLongError]);

    const handleKeyDown = useCallback(onKeyDown(handleOkBtnClick), [handleOkBtnClick]);
    const handleRemoveBtnClick = useCallback(() => {
        if (+currentChannelId === channel.id) {
            setCurrentChannel(null);
            history.push(`/`);
        }
        deleteChannel(channel.id);
    }, [deleteChannel, channel.id, setCurrentChannel, currentChannelId, history]);
    const okBtnClass = cn(`channels-item-btn`, `channels-item-btn--ok`,
        {'channels-item-btn--light': currentTheme === `light`});
    const removeBtnClass = cn(`channels-item-btn`, `channels-item-btn--remove`,
        {'channels-item-btn--light': currentTheme === `light`});

    return (
        <li className="channels-item">
            {isEmptyError && emptyMessage}
            {isLongError && longMessage}
            {isChannelEditing &&
                <>
                    <input className={inputClass} value={inputValue} onChange={handleChange} type="text"
                        placeholder="Name of the channel" onKeyDown={handleKeyDown} ref={renameInputRef}
                        onFocus={handleFocus}
                    />
                    <button className={okBtnClass} title="Rename channel" onClick={handleOkBtnClick} />
                </>
            }
            <NavLink className={linkClass} activeClassName="channels-link--active"
                title={channel.title} to={`${process.env.PUBLIC_URL}/${channel.id}`} onClick={handleLinkClick}
            >
                {`# ${channel.title.toLowerCase()}`}
            </NavLink>
            <button className={editBtnClass} title={isChannelEditing ? `Back` : `Edit channel`}
                onClick={handleRenameBtnClick}
            />
            <button className={removeBtnClass} title="Remove channel"
                onClick={handleRemoveBtnClick}
            />
        </li>
    );
});

ChannelsItem.propTypes = {
    channel: PropTypes.exact({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        participantsCount: PropTypes.number.isRequired,
        isFavourite: PropTypes.bool.isRequired,
    }).isRequired,
}

export {ChannelsItem};
