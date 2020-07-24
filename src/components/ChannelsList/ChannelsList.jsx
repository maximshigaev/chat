import React, {useContext} from 'react';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';
import {ChannelsItem} from '../';
import {MenuTitle} from '../';

import './ChannelsList.scss';

const ChannelsList = observer(() => {
    const store = useContext(StoreContext);

    return (
        <nav className="channels">
            <MenuTitle title="Channels" quantity={store.channels.length} />
            <ul className="channels-list custom-scrollbar custom-scrollbar--light">
                {store.channels.map((channel) => <ChannelsItem key={channel.id} channel={channel} />)}
            </ul>
        </nav>
    );
});

export {ChannelsList};
