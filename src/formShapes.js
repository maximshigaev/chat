import {object, string} from 'yup';

export const loginFormShape = {
    initialValues: {
        email: ``,
        password: ``,
    },
    schema: object().shape({
        email: string()
            .min(6, `Email should be more than 5 characters`)
            .required(`Email is required field`)
            .email(`Invalid email`)        
            .trim(),
        password: string()
            .min(6, `Password should be more than 5 characters`)
            .max(20, `Password should be less than 21 characters`)
            .required(`Password is required field`)
            .trim(),
    }),
}

const signUpSchema = {
    email: string()
        .min(6, `Email should be more than 5 characters`)
        .required(`Email is required field`)
        .email(`Invalid email`)        
        .trim(),
    password: string()
        .min(6, `Password should be more than 5 characters`)
        .max(20, `Password should be less than 21 characters`)
        .required(`Password is required field`)
        .trim(),
    firstName: string()
        .min(2, `Firstname should be more than 1 character`)
        .max(20, `Firstname should be less than 21 characters`)
        .required(`Firstname is required field`)
        .trim(),
    surName: string()
        .min(2, `Surname should be more than 1 character`)
        .max(20, `Surname should be less than 21 characters`)
        .required(`Surname is required field`)
        .trim(),
    userName: string()
        .min(6, `Username should be more than 5 characters`)
        .max(20, `Username should be less than 21 characters`)
        .required(`Username is required field`)
        .trim(),
    skype: string()
        .min(6, `Skype should be more than 5 characters`)
        .max(20, `Skype should be less than 21 characters`)
        .required(`Skype is required field`)
        .trim(),
}

export const signupFormShape = {
    initialValues: {
        firstName: ``,
        surName: ``,
        email: ``,
        password: ``,
        userName: ``,
        skype: ``,
    },
    schema: object().shape(signUpSchema),
}

export const myProfileShape = {
    schema: object().shape({...signUpSchema, 
        jobTitle: string()
            .min(2, `Profession should be more than 1 character`)
            .max(20, `Profession should be less than 21 characters`)
            .trim(),
        timeZone: string()
            .length(6, `Timezone should be exactly 5 characters`)
            .matches(/^(?:Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])$/, `Timezone doesn't match the format +04:00`)
            .trim(),
        fb: string()
            .min(6, `Facebook should be more than 5 characters`)
            .max(20, `Facebook should be less than 21 characters`)
            .matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/, `Invalid url`)
            .trim(),
        tw: string()
            .min(6, `Twitter should be more than 5 characters`)
            .max(20, `Twitter should be less than 21 characters`)
            .matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/, `Invalid url`)
            .trim(),
        inst: string()
            .min(6, `Instagram should be more than 5 characters`)
            .max(20, `Instagram should be less than 21 characters`)
            .matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/, `Invalid url`)
            .trim(),
        lkdn: string()
            .min(6, `Linkedin should be more than 5 characters`)
            .max(20, `Linkedin should be less than 21 characters`)
            .matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/, `Invalid url`)
            .trim(),
    }),
}
