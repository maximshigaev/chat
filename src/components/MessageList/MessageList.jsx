import React, {useContext, useEffect, useRef} from 'react';
import {observer} from 'mobx-react';
import cn from 'classnames';

import {Message} from '../';
import {StoreContext} from '../../context';
import {Spinner} from '../';
import {getErrorMessage} from '../../helpers';
import {ErrorMessage} from '../';

import './MessageList.scss';

const WEEK_DAYS = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
const MONTHS = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`,
    `November`, `December`];

const MessageList = observer(() => {
    const {currentMessages, filterTerm, uploadedFiles, isMessagesLoading, messagesError} = useContext(StoreContext);
    const listRef = useRef();
    const ulClass = cn(`message-list`, `custom-scrollbar`, {'message-list--uploaded': uploadedFiles.length});
    let prevDay = null;

    useEffect(() => listRef.current.scrollBy(0, listRef.current.scrollHeight), [currentMessages.length]);

    return (
        <ul className={ulClass} ref={listRef}>
            {isMessagesLoading && <Spinner />}
            {messagesError &&
                <ErrorMessage mode="chat">
                    {getErrorMessage(messagesError.type, `Messages`)}
                </ErrorMessage>
            }
            {!isMessagesLoading && !messagesError &&
                currentMessages.filter((message) => message.text.toLowerCase().includes(filterTerm.toLowerCase().trim()))
                    .sort((msgA, msgB) => Date.parse(msgA.date) - Date.parse(msgB.date))
                    .map((message) => {
                        const date = new Date(Date.parse(message.date))
                        const dayOfMonth = date.getDate();
                        
                        if (dayOfMonth !== prevDay) {
                            prevDay = dayOfMonth;
                            const formattedDate = `${WEEK_DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]}
                                ${dayOfMonth}, ${date.getFullYear()}`;

                            return (
                                <React.Fragment key={message.id}>
                                    <li className="message-break">
                                        {formattedDate}
                                    </li>
                                    <Message message={message} />
                                </React.Fragment>
                                
                            );
                        }

                        return <Message key={message.id} message={message} />;
                    })
            }
        </ul>
    );
});

export {MessageList};
