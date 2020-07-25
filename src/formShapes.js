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
            .max(15, `Password should be less than 15 characters`)
            .required(`Password is required field`)
            .trim(),
    }),
}

export const reviewFormShape = {
    initialValues: {
        'rating': ``,
        'review-text': ``,
    },
    schema: object().shape({
        'rating': string()
            .required(`Rating is required`),
        'review-text': string()
            .min(50, `Review should be more than 50 characters`)
            .max(400, `Review should be less than 400 characters`)
            .required(`Review is required field`)
            .trim(),
    }),
}
