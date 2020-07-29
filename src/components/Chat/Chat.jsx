import React, {useContext, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {observer} from 'mobx-react';

import {ChatHeader} from '../';
import {StoreContext} from '../../context';
import {MessageList} from '../';
import {ChatFooter} from '../';

import './Chat.scss';

const Chat = observer(() => {
    const currentChannelId = useLocation().pathname.slice(1);
    const {getCurrentMessages, currentChannel} = useContext(StoreContext);
    
    useEffect(() => {
        if (currentChannelId) {
            getCurrentMessages(currentChannelId);
        }
    }, [currentChannelId, getCurrentMessages]);

    if (!currentChannel) {
        return (
            <section className="chat chat--empty">
                Please, select a channel
            </section>
        );
    }

    return (
        <main className="chat">
            <ChatHeader />
            <MessageList />
            <ChatFooter />
        </main>
    );
});

export {Chat};
