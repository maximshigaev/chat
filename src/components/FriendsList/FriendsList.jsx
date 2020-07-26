import React, {useContext} from 'react';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';
import {MenuTitle} from '../';
import {Spinner} from '../';
import {FriendsItem} from '../';

import './FriendsList.scss';

const FriendsList = observer(() => {
    const {friends, isUsersLoading} = useContext(StoreContext);
    
    return (
        <div className="friends">
            {isUsersLoading && <Spinner size="middle" />}
            {!isUsersLoading &&
                <>
                    <MenuTitle title="Friends" quantity={friends.length} />
                    <ul className="friends-list custom-scrollbar custom-scrollbar--light">
                        {friends.map((friend) => <FriendsItem key={friend.id} friend={friend} />)}
                    </ul>
                </>
            }
        </div>
    );
});

export {FriendsList};
