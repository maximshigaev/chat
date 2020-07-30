import React, {useContext, useCallback} from 'react';
import PropTypes from 'prop-types';

import {StoreContext} from '../../context';

import './Message.scss';

const Message = ({message}) => {
    const {setCurrentUser, users, currentProfile} = useContext(StoreContext);
    const {date, text, author} = message;
    const messageDate = new Date(Date.parse(date));
    const isCurrentProfileMessage = author && author.email === currentProfile.email;

    const user = message.userId
        ? users.find((user) => user.id === message.userId)
        : author;
    const authorName = `${user.firstName} ${user.surName}`;

    const handleClick = useCallback(() => setCurrentUser(user), [setCurrentUser, user]);

    return (
        <li className="message">
            <a className="message-avatar-link" onClick={handleClick} title={`Open ${authorName}'s profile`}>
                <img className="message-avatar" src={user.avatar} alt={authorName} width="25" height="32" />
            </a>
            <div className="message-wrapper">
                <a className="message-link" onClick={handleClick}
                    title={isCurrentProfileMessage ? `Open my profile` : `Open ${authorName}'s profile`}>
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
                {message.images.length !== 0 &&
                    <p className="message-images">
                        {
                            message.images.map((image) => (
                                <img className="message-image" src={image.content} key={image.id}
                                    alt={`File-${image.id}`}
                                />
                            ))
                        }
                    </p>
                }
            </div>          
        </li>
    );
}

Message.propTypes = {
    message: PropTypes.exact({
        id: PropTypes.number.isRequired,
        channelId: PropTypes.number.isRequired,
        userId: PropTypes.number.isRequired,
        author: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            surName: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
        }),
        date: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
}

export {Message};
