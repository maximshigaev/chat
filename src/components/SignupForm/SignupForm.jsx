import React, {useContext, useState, useCallback} from 'react';
import {Formik, Form} from 'formik';
import {observer} from 'mobx-react';

import {signupFormShape} from '../../formShapes';
import {StoreContext} from '../../context';

import {FormErrorMessage} from '../';
import {FormField} from '../';

import './SignupForm.scss';
import avatarImg from "../../img/no-avatar.png";

const SignupForm = observer(() => {
    const {createUser, users} = useContext(StoreContext);
    const [wasRegisteredEmailError, setWasRegisteredEmailError] = useState(false);
    const [wasRegisteredUserNameError, setWasRegisteredUserNameError] = useState(false);
    const createErrorMessage = useCallback((field) => (
        <div className="signup-message">
            {`User with this ${field} is already registered`}
        </div>
    ), []);

    const handleSignupFormSubmit = (formData) => {
        const registeredEmailUser = users.find((user) => user.email === formData.email);
        const registeredUserNameUser = users.find((user) => user.userName === formData.userName);

        if (registeredEmailUser) {
            setWasRegisteredEmailError(true);
        } else if (registeredUserNameUser) {
            setWasRegisteredUserNameError(true);
        } else {
            createUser({
                ...formData,
                avatar: avatarImg,
                jobTitle: null,
                timeZone: null,
                fb: null,
                tw: null,
                inst: null,
                lkdn: null,
                isProfileOnline: true,
            });
        }
    };

    const handleFocus = useCallback(() => {
        setWasRegisteredUserNameError(false);
        setWasRegisteredEmailError(false);
    }, []);

    return (
        <Formik initialValues={signupFormShape.initialValues} onSubmit={handleSignupFormSubmit}
            validationSchema={signupFormShape.schema}
        >
            {({isValid}) => (
                <Form className="signup-form">
                    {wasRegisteredEmailError && createErrorMessage(`email`)}
                    {wasRegisteredUserNameError && createErrorMessage(`username`)}
                    <FormErrorMessage name="firstName" modifier="firstname" isSignupPage={true} />
                    <FormErrorMessage name="surName" modifier="surname" isSignupPage={true} />
                    <FormErrorMessage name="userName" modifier="username" isSignupPage={true} />
                    <FormErrorMessage name="email" modifier="email" isSignupPage={true} />
                    <FormErrorMessage name="password" modifier="password" isSignupPage={true} />
                    <FormErrorMessage name="skype" modifier="skype" isSignupPage={true} />
                    <FormField name="firstName" type="text" label="Firstname" isSignupPage={true} onFocus={handleFocus} />
                    <FormField name="surName" type="text" label="Surname" isSignupPage={true} onFocus={handleFocus} />
                    <FormField name="userName" type="text" label="Username" isSignupPage={true} onFocus={handleFocus} />
                    <FormField name="email" type="email" label="Email" isSignupPage={true} onFocus={handleFocus} />
                    <FormField name="password" type="password" label="Password" isSignupPage={true} onFocus={handleFocus} />
                    <FormField name="skype" type="text" label="Skype" isSignupPage={true} onFocus={handleFocus} />
                    <button className="signup-btn" title="Sign up" disabled={!isValid} type="submit">
                        Sign up
                    </button>
                </Form>
            )}
        </Formik>
    );
});

export {SignupForm};
