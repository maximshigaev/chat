import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {StoreContext} from '../../context';

import './ChannelsItem.scss';

const ChannelsItem = ({channel}) => {
    const store = useContext(StoreContext);
    const isCurrentChannel = store.currentChannel && store.currentChannel.id === channel.id;
    const itemClass = cn(`channels-item`, {'channels-item--active': isCurrentChannel});

    return (
        <li className={itemClass} title={channel.title}>
            {`# ${channel.title.toLowerCase()}`}
        </li>
    );
}

ChannelsItem.propTypes = {
    channel: PropTypes.exact({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        participantsCount: PropTypes.number.isRequired,
        isFavourite: PropTypes.bool.isRequired,
    }).isRequired,
}

export {ChannelsItem};
