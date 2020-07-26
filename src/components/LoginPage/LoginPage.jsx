import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';
import {Spinner} from '../';
import {LoginForm} from '../';

import './LoginPage.scss';

const LoginPage = observer(() => {
    const {currentProfile, isProfileUpdating} = useContext(StoreContext);

    if (isProfileUpdating) {
        return <Spinner />;
    }

    if (currentProfile) {
        return <Redirect to={`${process.env.PUBLIC_URL}/`} />;
    }

    return (
        <div className="login-page">
            <h1 className="login-page-heading">Sign in</h1>
            <LoginForm />
        </div>
    );
});

export {LoginPage};
