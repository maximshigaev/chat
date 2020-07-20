import React, {useContext} from 'react';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';
import {MenuTitle} from '../';
import {FriendsItem} from '../';

import './FriendsList.scss';

const FriendsList = observer(() => {
    const store = useContext(StoreContext);

    return (
        <div className="friends">
            <MenuTitle title="Friends" quantity={store.friends.length} />
            <ul className="friends__list">
                {store.friends.map((friend) => <FriendsItem key={friend.id} friend={friend} />)}
            </ul>
        </div>
    );
});

export {FriendsList};
