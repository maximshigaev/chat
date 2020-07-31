import React from 'react';
import {Field} from 'formik';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {FormErrorMessage} from '../';

import './FormField.scss';

const FormField = ({name, type, label, onFocus: handleFocus = () => {}, isSignupPage, isMyProfile}) => {
    const divClass = cn(`form-field`, {'form-field--signup': isSignupPage, 'form-field--my-profile': isMyProfile});
    const labelClass = cn(`form-label`, {'visually-hidden': !isMyProfile});

    return (
        <div className={divClass}>
            <label className={labelClass} htmlFor={name}>
                {label}
            </label>
            <Field className="form-input" type={type} placeholder={(label === `Timezone`) ? `+04:00` : label}
                name={name} id={name} onFocus={handleFocus}
            />
            {isMyProfile && <FormErrorMessage name={name} modifier="my-profile" />}
            {isSignupPage && <FormErrorMessage name={name} modifier="tablet" />}
        </div>
    );
}

FormField.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isSignupPage: PropTypes.bool,
    isMyProfile: PropTypes.bool,
    onFocus: PropTypes.func,
}

export {FormField};
