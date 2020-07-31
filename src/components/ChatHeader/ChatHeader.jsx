import React, {useContext} from 'react';
import {observer} from 'mobx-react';
import cn from 'classnames';

import {StoreContext} from '../../context';
import {SearchBar} from '../';

import './ChatHeader.scss';

const ChatHeader = observer(() => {
    const {currentChannel} = useContext(StoreContext);
    const {isFavourite, participantsCount, title} = currentChannel;
    const headingClass = cn(`chat-title`, {'chat-title--in-list': isFavourite});

    return (
        <div className="chat-header">
            <h2 className={headingClass} title={isFavourite ? `Favourite channel` : `Not favourite channel`}>
                {`# ${title.toLowerCase()}`}
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
