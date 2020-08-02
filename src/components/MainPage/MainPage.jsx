import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {observer} from 'mobx-react';

import {Menu} from '../';
import {Chat} from '../';
import {Profile} from '../';
import {Spinner} from '../';
import {StoreContext} from '../../context';
import {getErrorMessage} from '../../helpers';
import {ErrorMessage} from '../';

import './MainPage.scss';

const MainPage = observer(() => {
    const {onlineUser, isLoggingOut, usersError} = useContext(StoreContext);

    if (isLoggingOut) {
        return <Spinner />;
    }

    if (usersError && usersError.type === `logout`) {
        return (
            <ErrorMessage>
                {getErrorMessage(usersError.type)}
            </ErrorMessage>
        );
    }

    if (!onlineUser) {
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
