import React, {useContext} from 'react';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';
import {MenuTitle} from '../';
import {Spinner} from '../';
import {FriendsItem} from '../';
import {useControlledInput} from '../../hooks';

import './FriendsList.scss';

const FriendsList = observer(() => {
    const {friends, isUsersLoading, setFriendsFilterTerm, friendsFilterTerm, isUserUpdating} = useContext(StoreContext);
    const {inputValue, handleChange} = useControlledInput(setFriendsFilterTerm);

    return (
        <div className="friends">
            {(isUsersLoading || isUserUpdating) && <Spinner size="middle" />}
            {!isUsersLoading && !isUserUpdating &&
                <>
                    <MenuTitle title="Friends" quantity={friends.length} />
                    <input className="friends-search" value={inputValue} placeholder="Search.." onChange={handleChange} />
                    <ul className="friends-list custom-scrollbar custom-scrollbar--light">
                        {friends
                            .filter(({firstName, surName}) => {
                                return firstName.toLowerCase().includes(friendsFilterTerm.toLowerCase().trim())
                                    || surName.toLowerCase().includes(friendsFilterTerm.toLowerCase().trim());
                            })
                            .map((friend) => <FriendsItem key={friend.id} friend={friend} />)}
                    </ul>
                </>
            }
        </div>
    );
});

export {FriendsList};
