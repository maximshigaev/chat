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
    const {getCurrentMessages, currentChannel, setIsMenuOpened, setIsProfileOpened, isMobileMenuOpened,
        isMobileProfileOpened, setIsMobileProfileOpened, setIsMobileMenuOpened, messagesError, currentTheme
    } = useContext(StoreContext);

    const mainClass = cn(`chat`, {'chat--empty' : !currentChannel, 'chat--light': currentTheme === `light`});
    const menuBtnClass = cn(`chat-open-btn`, `chat-open-btn--menu`,
        {'chat-open-btn--opened-menu': isMobileMenuOpened});
    const profileBtnClass = cn(`chat-open-btn`, `chat-open-btn--profile`,
        {'chat-open-btn--opened-profile': isMobileProfileOpened});

    useEffect(() => {
        if (currentChannelId) {
            getCurrentMessages(currentChannelId);
        }
    }, [currentChannelId, getCurrentMessages]);

    const handleOpenMenuBtnClick = useCallback(() => {
        setIsMobileMenuOpened(true);
        setIsMenuOpened(true);
        setIsMobileProfileOpened(false);
    }, [setIsMenuOpened, setIsMobileMenuOpened, setIsMobileProfileOpened]);
    const handleOpenProfileBtnClick = useCallback(() => {
        setIsMobileProfileOpened(true);
        setIsProfileOpened(true);
        setIsMobileMenuOpened(false);
    }, [setIsProfileOpened, setIsMobileMenuOpened, setIsMobileProfileOpened]);

    return (
        <main className={mainClass}>
            <button className={menuBtnClass} title="Open menu" onClick={handleOpenMenuBtnClick} />
            <button className={profileBtnClass} title="Open profile" onClick={handleOpenProfileBtnClick} />
            {!currentChannel && !messagesError && `Please, select a channel`}
            {currentChannel && <ChatHeader />}
            {(currentChannel || messagesError) && <MessageList />}
            {currentChannel && <ChatFooter />}
        </main>
    );
});

export {Chat};
