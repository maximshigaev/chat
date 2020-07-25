import React from 'react';

import {ChannelsList} from '../';
import {FriendsList} from '../';
import {MenuHeader} from '../';

import './Menu.scss';

const Menu = () => (
    <section className="menu">
        <MenuHeader />
        <ChannelsList />
        <FriendsList />
    </section>
);

export {Menu};
