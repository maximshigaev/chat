import React, {useContext, useState} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {observer} from 'mobx-react';

import {StoreContext} from '../../context';
import {Spinner} from '../';
import {SignupForm} from '../';

import './SignupPage.scss';

const SignupPage = observer(() => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);
    const {currentProfile} = useContext(StoreContext);

    if (currentProfile) {
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
