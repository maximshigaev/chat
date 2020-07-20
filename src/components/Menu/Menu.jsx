import React from 'react';

import {ChannelsList} from '../';
import {FriendsList} from '../';

import './Menu.scss';

const Menu = () => (
    <section className="menu">
        <h2 className="menu__title">
            Nomad List
            <button className="menu__settings-button" title="Settings" />
            <button className="menu__dropdown-button" title="Expand" />
        </h2>
        <p className="menu__intro">All treads</p>
        <ChannelsList />
        <FriendsList />
    </section>
);

export {Menu};
