import React, {useContext} from 'react';
import {observer} from 'mobx-react';
import cn from 'classnames';

import {StoreContext} from '../../context';
import {SearchBar} from '../';

import './ChatHeader.scss';

const ChatHeader = observer(() => {
    const {currentChannel} = useContext(StoreContext);
    const {isFavourite, participantsCount, title} = currentChannel;
    const favouriteBtnClass = cn(`chat-favourite-btn`, {'chat-favourite-btn--in-list': isFavourite});

    return (
        <div className="chat-header">
            <h2 className="chat-title">
                {`# ${title.toLowerCase()}`}
            </h2>
            <button className={favouriteBtnClass} title={isFavourite ? `Remove favourite` : `Make favourite`} />
            <div className="chat-header-wrapper">
                <span className="chat-participants">
                    {participantsCount}
                </span>
                <SearchBar />
            </div>
        </div>
    );
});

export {ChatHeader};
