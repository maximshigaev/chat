import React, {useContext, useCallback} from 'react';
import {observer} from 'mobx-react';
import cn from 'classnames';

import {StoreContext} from '../../context';
import {SearchBar} from '../';

import './ChatHeader.scss';

const ChatHeader = observer(() => {
    const {currentChannel, updateChannel, currentTheme} = useContext(StoreContext);
    const {isFavourite, participantsCount, title} = currentChannel;
    const buttonClass = cn(`chat-header-btn`,
        {'chat-header-btn--in-list': isFavourite, 'chat-header-btn--light': currentTheme === `light`});
    const spanClass = cn(`chat-participants`, {'chat-participants--light': currentTheme === `light`});
    const divClass = cn(`chat-header-wrapper`, {'chat-header-wrapper--light': currentTheme === `light`});

    const handleClick = useCallback(() => {
        updateChannel({
            ...currentChannel,
            isFavourite: !isFavourite,
        }, currentChannel.id, `setFavourite`);
    }, [updateChannel, currentChannel, isFavourite]);

    return (
        <div className="chat-header">
            <h2 className="chat-title">
                {`# ${title.toLowerCase()}`}
                <button className={buttonClass} title={`${isFavourite ? `Remove from` : `Add to`} favourite channels`}
                    onClick={handleClick}
                />
            </h2>
            <div className={divClass}>
                <span className={spanClass} title={`${participantsCount} participants`}>
                    {participantsCount}
                </span>
                <SearchBar />
            </div>
        </div>
    );
});

export {ChatHeader};
