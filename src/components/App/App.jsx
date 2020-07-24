import React from 'react';

import {Menu} from '../';
import {Chat} from '../';
import {Profile} from '../';

import './App.scss';

const App = () => (
    <div className="app">
        <h1 className="visually-hidden">Chat</h1>
        <Menu />
        <Chat />
        <Profile />
    </div>
);

export {App};
