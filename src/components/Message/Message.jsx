import React, {useContext, useCallback} from 'react';
import PropTypes from 'prop-types';

import {StoreContext} from '../../context';

import './Message.scss';

const Message = ({message}) => {
    const {setCurrentUser, users} = useContext(StoreContext);
    const {date, text} = message;
    const messageDate = new Date(Date.parse(date));

    const user = (message.userId)
        ? users.find((user) => user.id === message.userId)
        : message.author;
    const authorName = `${user.firstName} ${user.lastName}`; 

    const handleClick = useCallback(() => setCurrentUser(user), [setCurrentUser, user]);

    return (
        <li className="message">
            <img className="message-avatar" src={user.avatar} alt={authorName} width="25" height="32" />
            <div className="message-wrapper">
                <a className="message-link" title={`Open ${authorName}'s profile`} onClick={handleClick}>
                    {authorName}
                </a>
                <time className="message-date">
                    {`${messageDate.getHours()}:${(messageDate.getMinutes() + '').padStart(2, 0)}
                        ${messageDate.getHours() > 11 ? 'PM' : 'AM'}`
                    }
                </time>
                <p className="message-text">
                    {text}
                </p>
            </div>          
        </li>
    );
}

Message.propTypes = {
    message: PropTypes.exact({
        id: PropTypes.number.isRequired,
        channelId: PropTypes.number.isRequired,
        userId: PropTypes.number.isRequired,
        author: {
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
        },
        date: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired,
}

export {Message};
