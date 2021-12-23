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

export const checkoutValidationSchema = yup.object({
    name: yup
        .string('Enter Your Name')
        .required('Name is required'),
    country: yup
        .string('Choose Your Country')
        .required('Country is required'),
    phone: yup
        .string('Enter Your Phone Number')
        .required('Phone Number is required'),
    address: yup
        .string('Enter Your Address')
        .required('Address is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    zip_code: yup
        .string('Enter your Address Zip Code')
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Zip Code is required'),
    pay_mode: yup
        .string()
        .required('Choose Pay Mode')
})