import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import './ChannelsItem.scss';

const ChannelsItem = ({channel}) =>  (
    <li className="channels-item">
        <NavLink className="channels-link" activeClassName="channels-link--active"
            title={channel.title} to={`/${channel.id}`}
        >
            {`# ${channel.title.toLowerCase()}`}
        </NavLink>
    </li>
);

ChannelsItem.propTypes = {
    channel: PropTypes.exact({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        participantsCount: PropTypes.number.isRequired,
        isFavourite: PropTypes.bool.isRequired,
    }).isRequired,
}

export {ChannelsItem};
