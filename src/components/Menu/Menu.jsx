import React from 'react';

import {ChannelsList} from '../';
import {FriendsList} from '../';

import './Menu.scss';

const Menu = () => (
    <section className="menu">
        <h2 className="menu-title">
            Nomad List
            <button className="menu-settings-button" title="Open settings" />
            <button className="menu-dropdown-button" title="Expand" />
        </h2>
        <p className="menu-intro">All threads</p>
        <ChannelsList />
        <FriendsList />
    </section>
);

export {Menu};
