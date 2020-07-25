import React, {useContext, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';
import {Spinner} from '../';
import {LoginForm} from '../';

import './LoginPage.scss';

const LoginPage = observer(() => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const {profile} = useContext(StoreContext);

    if (profile && !!Object.keys(profile).length) {
        return <Redirect to={`${process.env.PUBLIC_URL}/`} />;
    }

    const handleSignUpBtnClick = () => setIsNewUser(true);

    return (
        <div className="login-page">
            <h1 className="login-page-heading">
                {isNewUser ? `Sign Up` : `Sign in`}
            </h1>
            <LoginForm onSignUpClick={handleSignUpBtnClick} />
        </div>
    );
});

export {LoginPage};
