import * as yup from 'yup'

export const loginValidationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required')
})

export const registerValidationSchema = yup.object({
    name: yup
        .string('Enter Your Name')
        .required('Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    password_confirmation: yup
        .string('Enter your password')
        .required('Please re-type password')
        .when('password', 
            {
                is: val => (val && val.length > 0 ? true : false),
                then: yup.string().oneOf(
                    [yup.ref('password')],
                    'Both password need to be the same'
                    )
            })
})

export const reviewValidationSchema = yup.object({
    name: yup
        .string('Enter Your Name')
        .required('Name is required'),
    text: yup
        .string('Enter your Review')
        .required('Review is required')
})