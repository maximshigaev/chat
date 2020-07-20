import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './FriendsItem.scss';

const FriendsItem = ({friend}) => {
    const {firstName, lastName, isOnline, avatar} = friend;
    const itemClass = cn(`friends-item`, {'friends-item--online': isOnline});
    const userName = `${firstName} ${lastName}`;

    return (
        <li className={itemClass}
            title={`${userName}(${isOnline ? `Online`: `Offline`})`}
        >
            <img className="friends-image" src={avatar} width="35px" height= "32px"
                alt={`${userName}`}
            />
            {`${userName}`}
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
