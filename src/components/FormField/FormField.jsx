import React from 'react';
import {Field} from 'formik';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './FormField.scss';

const FormField = ({name, type, label, onFocus: handleFocus, isSignupPage}) => {
    const divClass = cn(`form-field`, {'form-field--signup': isSignupPage});

    return (
        <div className={divClass}>
            <Field className="form-input" type={type} placeholder={label} name={name} id={name}
                onFocus={handleFocus ? handleFocus : () => {}}
            />
            <label className="form-label visually-hidden" htmlFor={name}>
                {label}
            </label>
        </div>
    );
}

FormField.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isSignupPage:  PropTypes.bool,
}

export {FormField};
