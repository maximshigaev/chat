import React, {useContext} from 'react';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';
import {ChannelsItem} from '../';
import {MenuTitle} from '../';
import {Spinner} from '../';

import './ChannelsList.scss';

const ChannelsList = observer(() => {
    const {channels, isChannelsLoading} = useContext(StoreContext);

    return (
        <nav className="channels">
            {isChannelsLoading && <Spinner size="middle" />}
            {!isChannelsLoading &&
                <>
                    <MenuTitle title="Channels" quantity={channels.length} />
                    <ul className="channels-list custom-scrollbar custom-scrollbar--light">
                        {channels.map((channel) => <ChannelsItem key={channel.id} channel={channel} />)}
                    </ul>
                </>
            }
        </nav>
    );
});

export {ChannelsList};
