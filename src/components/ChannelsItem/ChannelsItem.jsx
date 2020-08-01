import React, {useContext, useCallback} from 'react';
import PropTypes from 'prop-types';
import {NavLink, useLocation} from 'react-router-dom';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';

import './ChannelsItem.scss';

const ChannelsItem = observer(({channel}) => {
    const {setUploadedFiles, setIsMenuOpened, setIsMobileMenuOpened} = useContext(StoreContext);
    const currentChannelId = useLocation().pathname.slice(1);

    const handleClick = useCallback(() => {
        if (+currentChannelId !== channel.id) {
            setUploadedFiles([]);
            setIsMenuOpened(false);
            setIsMobileMenuOpened(false);
        }
    }, [setUploadedFiles, channel.id, currentChannelId, setIsMenuOpened, setIsMobileMenuOpened]);

    return (
        <li className="channels-item">
            <NavLink className="channels-link" activeClassName="channels-link--active"
                title={channel.title} to={`${process.env.PUBLIC_URL}/${channel.id}`} onClick={handleClick}
            >
                {`# ${channel.title.toLowerCase()}`}
            </NavLink>
        </li>
    );
});

ChannelsItem.propTypes = {
    channel: PropTypes.exact({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        participantsCount: PropTypes.number.isRequired,
        isFavourite: PropTypes.bool.isRequired,
    }).isRequired,
}

export {ChannelsItem};
