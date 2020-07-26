import React, {useContext, useState, useCallback} from 'react';
import {Formik, Form} from 'formik';
import {Link} from 'react-router-dom';
import {observer} from 'mobx-react';

import {loginFormShape} from '../../formShapes';
import {StoreContext} from '../../context';
import {FormErrorMessage} from '../';
import {FormField} from '../';

import './LoginForm.scss';

const LoginForm = observer(() => {
    const {profiles, updateProfile} = useContext(StoreContext);
    const [isNotFoundError, setIsNotFoundError] = useState(false);

    const handleLoginFormSubmit = (formData) => {
        const registeredProfile =
            profiles.find((profile) => profile.email === formData.email && profile.password === formData.password);

        if (registeredProfile) {
            updateProfile({
                ...registeredProfile,
                isOnline: true,
            }, registeredProfile.id);
        } else {
            setIsNotFoundError(true);
        }
    };

    const handleFocus = useCallback(() => setIsNotFoundError(false), []);

    return (
        <Formik initialValues={loginFormShape.initialValues} onSubmit={handleLoginFormSubmit}
            validationSchema={loginFormShape.schema}
        >
            {({isValid}) => (
                <Form className="login-form">
                    {isNotFoundError &&
                        <div className="login-message">
                            User not found. Please sign up
                        </div>
                    }
                    <FormErrorMessage name="email" modifier="email" isLoginPage={true} />
                    <FormErrorMessage name="password" modifier="password" isLoginPage={true} />
                    <FormField name="email" type="email" label="Email" onFocus={handleFocus} />
                    <FormField name="password" type="password" label="Password" onFocus={handleFocus} />
                    <button className="form-btn form-btn--login" title="Log in" disabled={!isValid}  type="submit">
                        Log in
                    </button>
                    <Link className="form-btn form-btn--signup" title="Sign up" to={`${process.env.PUBLIC_URL}/signup`} >
                        Sign up
                    </Link>
                </Form>
            )}
        </Formik>
    );
});

export {LoginForm};
