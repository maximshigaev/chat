import React from 'react';
import PropTypes from 'prop-types';

import './Message.scss';

const Message = ({message}) => {
    const {author, date, text} = message;
    const authorName = `${author.firstName} ${author.lastName}`;
    const messageDate = new Date(Date.parse(date));

    return (
        <li className="message">
            <img className="message-avatar" src={author.avatar} alt={authorName}width="25" height="32" />
            <div className="message-wrapper">
                <a className="message-link" href="#" title={`Open ${authorName}'s profile`}>
                    {authorName}
                </a>
                <time className="message-date">
                    {`${messageDate.getHours()}:${messageDate.getMinutes()} ${messageDate.getHours() > 11 ? 'PM' : 'AM'}`}
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
