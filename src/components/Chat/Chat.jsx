import React, {useContext, useEffect, useCallback} from 'react';
import {useLocation} from 'react-router-dom';
import {observer} from 'mobx-react';
import cn from 'classnames';

import {ChatHeader} from '../';
import {StoreContext} from '../../context';
import {MessageList} from '../';
import {ChatFooter} from '../';

import './Chat.scss';

const Chat = observer(() => {
    const currentChannelId = useLocation().pathname.slice(1);
    const {getCurrentMessages, currentChannel, setIsMenuOpened, setIsProfileOpened, isMenuOpened,
        isProfileOpened
    } = useContext(StoreContext);
    const mainClass = cn(`chat`, {'chat--empty': !currentChannel});

    useEffect(() => {
        if (currentChannelId) {
            getCurrentMessages(currentChannelId);
        }
    }, [currentChannelId, getCurrentMessages]);

    const handleOpenMenuBtnClick = useCallback(() => setIsMenuOpened(true), [setIsMenuOpened]);
    const handleOpenProfileBtnClick = useCallback(() => setIsProfileOpened(true), [setIsProfileOpened]);

    return (
        <main className={mainClass}>
            {!isMenuOpened &&
                <button className="chat-open-btn chat-open-btn--menu" title="Open menu" onClick={handleOpenMenuBtnClick} />
            }
            {!isProfileOpened &&
                <button className="chat-open-btn chat-open-btn--profile" title="Open profile"
                    onClick={handleOpenProfileBtnClick}
                />
            }
            {!currentChannel && `Please, select a channel`}
            {currentChannel &&
                <>
                    <ChatHeader />
                    <MessageList />
                    <ChatFooter />
                </>
            }
        </main>
    );
});

export {Chat};
