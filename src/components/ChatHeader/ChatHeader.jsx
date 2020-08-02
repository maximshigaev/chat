import React, {useContext, useCallback} from 'react';
import {observer} from 'mobx-react';
import cn from 'classnames';

import {StoreContext} from '../../context';
import {SearchBar} from '../';

import './ChatHeader.scss';

const ChatHeader = observer(() => {
    const {currentChannel, updateChannel} = useContext(StoreContext);
    const {isFavourite, participantsCount, title} = currentChannel;
    const buttonClass = cn(`chat-header-btn`, {'chat-header-btn--in-list': isFavourite});

    const handleClick = useCallback(() => {
        updateChannel({
            ...currentChannel,
            isFavourite: !isFavourite,
        }, currentChannel.id);
    }, [updateChannel, currentChannel, isFavourite]);

    return (
        <div className="chat-header">
            <h2 className="chat-title">
                {`# ${title.toLowerCase()}`}
                <button className={buttonClass} title={`${isFavourite ? `Remove from` : `Add to`} favourite channels`}
                    onClick={handleClick}
                />
            </h2>
            <div className="chat-header-wrapper">
                <span className="chat-participants" title={`${participantsCount} participants`}>
                    {participantsCount}
                </span>
                <SearchBar />
            </div>
        </div>
    );
});

export {ChatHeader};
