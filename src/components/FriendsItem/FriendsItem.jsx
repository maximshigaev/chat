import React, {useContext, useCallback} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';

import './FriendsItem.scss';

const FriendsItem = observer(({friend}) => {
    const {setCurrentUser, setIsProfileOpened, currentTheme, currentUser} = useContext(StoreContext);
    const {firstName, surName, isOnline, avatar} = friend;
    const itemClass = cn(`friends-item`, {'friends-item--online': isOnline});
    const friendName = `${firstName} ${surName}`;
    const linkClass = cn(`friends-link`,
        {'friends-link--light': currentTheme === `light`, 'friends-link--active': currentUser && currentUser.id === friend.id});

    const handleClick = useCallback(() => {
        setIsProfileOpened(true);
        setCurrentUser(friend);
    }, [setCurrentUser, friend, setIsProfileOpened]);

    return (
        <li className={itemClass}>
            <a className={linkClass} onClick={handleClick}
                title={`Open ${friendName}'s profile(${isOnline ? `Online`: `Offline`})`}
            >
                <img className="friends-image" src={avatar} width="35px" height= "32px"
                    alt={`${friendName}`}
                />
                {`${friendName}`}
            </a>
        </li>
    );
});

FriendsItem.propTypes = {
    friend: PropTypes.exact({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        surName: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        jobTitle: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        skype: PropTypes.string.isRequired,
        timeZone: PropTypes.string.isRequired,
        isFriend: PropTypes.bool.isRequired,
        isOnline: PropTypes.bool.isRequired,
        fb: PropTypes.string.isRequired,
        tw: PropTypes.string.isRequired,
        inst: PropTypes.string.isRequired,
        lkdn: PropTypes.string.isRequired,
    }).isRequired,
}

export {FriendsItem};
