import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {StoreContext} from '../../context';

import './FriendsItem.scss';

const FriendsItem = ({friend}) => {
    const {firstName, lastName, isOnline, avatar} = friend;
    const itemClass = cn(`friends-item`, {'friends-item--online': isOnline});
    const friendName = `${firstName} ${lastName}`;
    const {setCurrentUser} = useContext(StoreContext);

    const handleClick = () => setCurrentUser(friend);

    return (
        <li className={itemClass}>
            <a className="friends-link" onClick={handleClick}
                title={`Open ${friendName}'s profile(${isOnline ? `Online`: `Offline`})`}
            >
                <img className="friends-image" src={avatar} width="35px" height= "32px"
                    alt={`${friendName}`}
                />
                {`${friendName}`}
            </a>
        </li>
    );
}

FriendsItem.propTypes = {
    friend: PropTypes.exact({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        jobTitle: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        skype: PropTypes.string.isRequired,
        timeZone: PropTypes.string.isRequired,
        isFriend: PropTypes.bool.isRequired,
        isOnline: PropTypes.bool.isRequired,
        social: {
            fb: PropTypes.string.isRequired,
            tw: PropTypes.string.isRequired,
            inst: PropTypes.string.isRequired,
            lkdn: PropTypes.string.isRequired,
        },
    }).isRequired,
}

export {FriendsItem};
