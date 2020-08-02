import React, {useContext} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';
import {Spinner} from '../';
import {SignupForm} from '../';
import {getErrorMessage} from '../../helpers';
import {ErrorMessage} from '../';

import './SignupPage.scss';

const SignupPage = observer(() => {
    const {onlineUser, isUserCreating, usersError} = useContext(StoreContext);

    if (isUserCreating) {
        return <Spinner />;
    }

    if (usersError && usersError.type === `signup`) {
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
        <div className="signup-page">
            <h1 className="signup-page-heading">Sign up</h1>
            <SignupForm />
            <Link className="signup-link" to={`${process.env.PUBLIC_URL}/login`} title="Back to login">
                Back to login
            </Link>
        </div>
    );
});

export {SignupPage};
