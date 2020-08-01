import React, {useContext, useCallback} from 'react';
import PropTypes from 'prop-types';
import {NavLink, useLocation, useHistory} from 'react-router-dom';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';

import './ChannelsItem.scss';

const ChannelsItem = observer(({channel}) => {
    const {setUploadedFiles, setIsMenuOpened, setIsMobileMenuOpened, deleteChannel,
        setCurrentChannel
    } = useContext(StoreContext);
    const currentChannelId = useLocation().pathname.slice(1);
    const history = useHistory();

    const handleLinkClick = useCallback(() => {
        if (+currentChannelId !== channel.id) {
            setUploadedFiles([]);
            setIsMenuOpened(false);
            setIsMobileMenuOpened(false);
        }
    }, [setUploadedFiles, channel.id, currentChannelId, setIsMenuOpened, setIsMobileMenuOpened]);

    const handleRenameBtnClick = useCallback(() => {}, []);
    const handleRemoveBtnClick = useCallback(() => {
        if (+currentChannelId === channel.id) {
            setCurrentChannel(null);
            history.push(`/`);
        }

        deleteChannel(channel.id);
    }, [deleteChannel, channel.id, setCurrentChannel, currentChannelId, history]);

    return (
        <li className="channels-item">
            <NavLink className="channels-link" activeClassName="channels-link--active"
                title={channel.title} to={`${process.env.PUBLIC_URL}/${channel.id}`} onClick={handleLinkClick}
            >
                {`# ${channel.title.toLowerCase()}`}
            </NavLink>
            <button className="channels-item-btn channels-item-btn--rename" title="Rename channel"
                onClick={handleRenameBtnClick}
            />
            <button className="channels-item-btn channels-item-btn--remove" title="Remove channel"
                onClick={handleRemoveBtnClick}
            />
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
