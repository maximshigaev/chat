import React, {useContext, useEffect, useRef} from 'react';
import {observer} from 'mobx-react';

import {Message} from '../';
import {StoreContext} from '../../context';

import './MessageList.scss';

const WEEK_DAYS = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
const MONTHS = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`,
    `November`, `December`];

const MessageList = observer(() => {
    const {currentMessages, filterTerm} = useContext(StoreContext);
    const listRef = useRef();
    let prevDay = null;

    useEffect(() => listRef.current.scrollBy(0, listRef.current.scrollHeight), [currentMessages.length]);

    return (
        <ul className="message-list" ref={listRef}>
            {currentMessages
                .filter((message) => message.text.includes(filterTerm))
                .sort((msgA, msgB) => Date.parse(msgA.date) - Date.parse(msgB.date))
                .map((message) => {
                    const date = new Date(Date.parse(message.date))
                    const dayOfMonth = date.getDate();
                    
                    if (dayOfMonth !== prevDay) {
                        prevDay = dayOfMonth;
                        const formattedDate =
                            `${WEEK_DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${dayOfMonth}, ${date.getFullYear()}`;

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
