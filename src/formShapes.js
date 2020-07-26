import {object, string} from 'yup';

export const loginFormShape = {
    initialValues: {
        email: ``,
        password: ``,
    },
    schema: object().shape({
        email: string()
            .min(6, `Email should be more than 6 characters`)
            .required(`Email is required field`)
            .email(`Invalid email`)        
            .trim(),
        password: string()
            .min(6, `Password should be more than 6 characters`)
            .max(20, `Password should be less than 20 characters`)
            .required(`Password is required field`)
            .trim(),
    }),
}

export const signFormShape = {
    initialValues: {
        firstName: ``,
        surName: ``,
        email: ``,
        password: ``,
        userName: ``,
        skype: ``,
    },
    schema: object().shape({
        email: string()
            .min(6, `Email should be more than 6 characters`)
            .required(`Email is required field`)
            .email(`Invalid email`)        
            .trim(),
        password: string()
            .min(6, `Password should be more than 6 characters`)
            .max(20, `Password should be less than 20 characters`)
            .required(`Password is required field`)
            .trim(),
        firstName: string()
            .min(2, `Firstname should be more than 2 characters`)
            .max(20, `Firstname should be less than 20 characters`)
            .required(`Firstname is required field`)
            .trim(),
        surName: string()
            .min(2, `Surname should be more than 2 characters`)
            .max(20, `Surname should be less than 20 characters`)
            .required(`Surname is required field`)
            .trim(),
        userName: string()
            .min(2, `Username should be more than 6 characters`)
            .max(20, `Username should be less than 20 characters`)
            .required(`Username is required field`)
            .trim(),
        skype: string()
            .min(2, `Skype should be more than 6 characters`)
            .max(20, `Skype should be less than 20 characters`)
            .required(`Skype is required field`)
            .trim(),
    }),
}
