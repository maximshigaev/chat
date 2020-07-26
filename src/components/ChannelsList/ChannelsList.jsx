import React, {useContext} from 'react';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';
import {ChannelsItem} from '../';
import {MenuTitle} from '../';
import {Spinner} from '../';
import {useControlledInput} from '../../hooks';

import './ChannelsList.scss';

const ChannelsList = observer(() => {
    const {channels, isChannelsLoading, setChannelsFilterTerm, channelsFilterTerm} = useContext(StoreContext);
    const {inputValue, handleChange} = useControlledInput(setChannelsFilterTerm);

    return (
        <nav className="channels">
            {isChannelsLoading && <Spinner size="middle" />}
            {!isChannelsLoading &&
                <>
                    <MenuTitle title="Channels" quantity={channels.length} />
                    <input className="channels-search" value={inputValue} placeholder="Search.." onChange={handleChange} />
                    <ul className="channels-list custom-scrollbar custom-scrollbar--light">
                        {channels
                            .filter((channel) => {
                                return channel.title.toLowerCase().includes(channelsFilterTerm.toLowerCase().trim());
                            })
                            .map((channel) => <ChannelsItem key={channel.id} channel={channel} />)
                        }
                    </ul>
                </>
            }
        </nav>
    );
});

export {ChannelsList};
