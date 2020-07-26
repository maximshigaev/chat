import React, {useContext} from 'react';
import {Formik, Form} from 'formik';
import {observer} from 'mobx-react';

import {signFormShape} from '../../formShapes';
import {StoreContext} from '../../context';

import {FormErrorMessage} from '../';
import {FormField} from '../';

import './SignupForm.scss';

const SignupForm = observer(() => {
    const {createProfile} = useContext(StoreContext);

    const handleSignupFormSubmit = (formData) => {
        createProfile({
            ...formData,
            avatar: null,
            jobTitle: null,
            timeZone: null,
            social: {
                fb: null,
                tw: null,
                inst: null,
                lkdn: null,
            },
            isOnline: true,
        });
    };

    return (
        <Formik initialValues={signFormShape.initialValues} onSubmit={handleSignupFormSubmit}
            validationSchema={signFormShape.schema}
        >
            {({isValid}) => (
                <Form className="signup-form">
                    <FormErrorMessage name="firstName" modifier="firstname" />
                    <FormErrorMessage name="surName" modifier="surname" />
                    <FormErrorMessage name="userName" modifier="username" />
                    <FormErrorMessage name="email" modifier="email" />
                    <FormErrorMessage name="password" modifier="password" />
                    <FormErrorMessage name="skype" modifier="skype" />
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
