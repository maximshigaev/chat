import React, {useContext, useState, useCallback} from 'react';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';
import {MenuTitle} from '../';
import {Spinner} from '../';
import {FriendsItem} from '../';

import './FriendsList.scss';

const FriendsList = observer(() => {
    const {friends, isUsersLoading, setFriendsFilterTerm, friendsFilterTerm} = useContext(StoreContext);
    const [inputValue, setInputValue] = useState(``);
    const handleChange = useCallback((evt) => {
        setInputValue(evt.target.value);
        setFriendsFilterTerm(evt.target.value);
    }, [setFriendsFilterTerm]);
    
    return (
        <div className="friends">
            {isUsersLoading && <Spinner size="middle" />}
            {!isUsersLoading &&
                <>
                    <MenuTitle title="Friends" quantity={friends.length} />
                    <input className="friends-search" value={inputValue} placeholder="Search.." onChange={handleChange} />
                    <ul className="friends-list custom-scrollbar custom-scrollbar--light">
                        {friends
                            .filter(({firstName, lastName}) => {
                                return firstName.toLowerCase().includes(friendsFilterTerm.toLowerCase().trim())
                                    || lastName.toLowerCase().includes(friendsFilterTerm.toLowerCase().trim());
                            })
                            .map((friend) => <FriendsItem key={friend.id} friend={friend} />)}
                    </ul>
                </>
            }
        </div>
    );
});

export {FriendsList};
