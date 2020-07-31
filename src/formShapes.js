import {object, string} from 'yup';

export const loginFormShape = {
    initialValues: {
        email: ``,
        password: ``,
    },
    schema: object().shape({
        email: string()
            .min(6, `Email is less than 6 characters`)
            .required(`Email is required field`)
            .email(`Invalid email`)        
            .trim(),
        password: string()
            .min(6, `Password is less than 6 characters`)
            .max(20, `Password is more than 20 characters`)
            .required(`Password is required field`)
            .trim(),
    }),
}

const signUpSchema = {
    email: string()
        .min(6, `Email is less than 6 characters`)
        .required(`Email is required field`)
        .email(`Invalid email`)        
        .trim(),
    password: string()
        .min(6, `Password is less than 6 characters`)
        .max(20, `Password is more than 20 characters`)
        .required(`Password is required field`)
        .trim(),
    firstName: string()
        .min(2, `Firstname is less than 2 characters`)
        .max(20, `Firstname is more than 20 characters`)
        .required(`Firstname is required field`)
        .trim(),
    surName: string()
        .min(2, `Surname is less than 2 characters`)
        .max(20, `Surname is more than 20 characters`)
        .required(`Surname is required field`)
        .trim(),
    userName: string()
        .min(6, `Username is less than 6 characters`)
        .max(20, `Username is more than 20 characters`)
        .required(`Username is required field`)
        .trim(),
    skype: string()
        .min(6, `Skype is less than 6 characters`)
        .max(20, `Skype is more than 20 characters`)
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
            .min(2, `Profession is less than 2 characters`)
            .max(20, `Profession is more than 20 characters`)
            .trim(),
        timeZone: string()
            .length(6, `Timezone is not exactly 5 characters`)
            .matches(/^(?:Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])$/, `Timezone doesn't match the format +04:00`)
            .trim(),
        fb: string()
            .min(6, `Facebook is less than 6 characters`)
            .max(20, `Facebook is more than 20 characters`)
            .matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/, `Invalid url`)
            .trim(),
        tw: string()
            .min(6, `Twitter is less than 6 characters`)
            .max(20, `Twitter is more than 20 characters`)
            .matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/, `Invalid url`)
            .trim(),
        inst: string()
            .min(6, `Instagram is less than 6 characters`)
            .max(20, `Instagram is more than 20 characters`)
            .matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/, `Invalid url`)
            .trim(),
        lkdn: string()
            .min(6, `Linkedin is less than 6 characters`)
            .max(20, `Linkedin is more than 20 characters`)
            .matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/, `Invalid url`)
            .trim(),
    }),
}
