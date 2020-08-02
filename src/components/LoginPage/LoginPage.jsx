import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';
import {Spinner} from '../';
import {LoginForm} from '../';
import {getErrorMessage} from '../../helpers';
import {ErrorMessage} from '../';

import './LoginPage.scss';

const LoginPage = observer(() => {
    const {onlineUser, isUserUpdating, usersError} = useContext(StoreContext);

    if (isUserUpdating) {
        return <Spinner />;
    }

    if (usersError && usersError.type === `login`) {
        return (
            <ErrorMessage>
                {getErrorMessage(usersError.type)}
            </ErrorMessage>
        );
    }

    if (onlineUser) {
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
