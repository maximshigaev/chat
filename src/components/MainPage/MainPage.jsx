import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {observer} from 'mobx-react';

import {Menu} from '../';
import {Chat} from '../';
import {Profile} from '../';
import {StoreContext} from '../../context';

import './MainPage.scss';

const MainPage = observer(() => {
    const {profile} = useContext(StoreContext);

    if (!profile) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="main-page">
            <h1 className="visually-hidden">Chat</h1>
            <Menu />
            <Chat />
            <Profile />
        </div>
    );
});

export {MainPage};
