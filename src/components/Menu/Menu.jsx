import React, {useContext} from 'react';
import {observer} from 'mobx-react';

import {ChannelsList} from '../';
import {FriendsList} from '../';
import {MenuHeader} from '../';
import {StoreContext} from '../../context';
import {MyProfile} from '../';

import './Menu.scss';

const Menu =  observer(() =>{
    const {isMyProfileOpen} = useContext(StoreContext);

    return (
        <section className="menu">
            <MenuHeader />
            {isMyProfileOpen &&
                <MyProfile />
            }
            {!isMyProfileOpen &&
                <>
                    <ChannelsList />
                    <FriendsList />
                </>
            }
        </section>
    );
});

export {Menu};
