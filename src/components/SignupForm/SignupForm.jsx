import React, {useContext} from 'react';
import {Formik, Form} from 'formik';
import {observer} from 'mobx-react';

import {signupFormShape} from '../../formShapes';
import {StoreContext} from '../../context';

import {FormErrorMessage} from '../';
import {FormField} from '../';

import './SignupForm.scss';
import avatarImg from "../../img/no-avatar.png";

const SignupForm = observer(() => {
    const {createUser} = useContext(StoreContext);

    const handleSignupFormSubmit = (formData) => {
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
    };

    return (
        <Formik initialValues={signupFormShape.initialValues} onSubmit={handleSignupFormSubmit}
            validationSchema={signupFormShape.schema}
        >
            {({isValid}) => (
                <Form className="signup-form">
                    <FormErrorMessage name="firstName" modifier="firstname" isSignupPage={true} />
                    <FormErrorMessage name="surName" modifier="surname" isSignupPage={true} />
                    <FormErrorMessage name="userName" modifier="username" isSignupPage={true} />
                    <FormErrorMessage name="email" modifier="email" isSignupPage={true} />
                    <FormErrorMessage name="password" modifier="password" isSignupPage={true} />
                    <FormErrorMessage name="skype" modifier="skype" isSignupPage={true} />
                    <FormField name="firstName" type="text" label="Firstname" isSignupPage={true} />
                    <FormField name="surName" type="text" label="Surname" isSignupPage={true} />
                    <FormField name="userName" type="text" label="Username" isSignupPage={true} />
                    <FormField name="email" type="email" label="Email" isSignupPage={true} />
                    <FormField name="password" type="password" label="Password" isSignupPage={true} />
                    <FormField name="skype" type="text" label="Skype" isSignupPage={true} />
                    <button className="signup-btn" title="Sign up" disabled={!isValid} type="submit">
                        Sign up
                    </button>
                </Form>
            )}
        </Formik>
    );
});

export {SignupForm};
