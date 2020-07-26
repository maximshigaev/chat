import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {observer} from 'mobx-react';

import {Menu} from '../';
import {Chat} from '../';
import {Profile} from '../';
import {Spinner} from '../';
import {StoreContext} from '../../context';

import './MainPage.scss';

const MainPage = observer(() => {
    const {currentProfile, isProfileUpdating} = useContext(StoreContext);

    if (isProfileUpdating) {
        return <Spinner />;
    }

    if (!currentProfile) {
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
