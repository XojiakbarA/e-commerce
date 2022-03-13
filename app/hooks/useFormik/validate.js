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
    rating: yup
        .number('Enter Your Rating')
        .required('Rating is required'),
    text: yup
        .string('Enter your Review')
        .required('Review is required')
})

export const checkoutValidationSchema = yup.object({
    name: yup
        .string('Enter Your Name')
        .required('Name is required'),
    region_id: yup
        .number('Select Your Region')
        .required('Region is required'),
    district_id: yup
        .number('Select Your District')
        .required('District is required'),
    street: yup
        .string('Enter Your Street')
        .required('Street is required'),
    home: yup
        .string('Enter Your Home Number')
        .required('Home Number is required'),
    phone: yup
        .string('Enter your Phone')
        .required('Phone is required')
        .min(14, 'Phone should be of minimum 9 characters length'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    pay_mode: yup
        .string()
        .required('Choose Pay Mode')
})

export const editProfileValidationSchema = yup.object({
    first_name: yup
        .string('Enter Your First Name')
        .required('First Name is required'),
    email: yup
        .string('Enter your Email')
        .email('Enter a valid email')
        .required('Email is required'),
    phone: yup
        .string('Enter your Phone')
        .min(14, 'Phone should be of minimum 9 characters length')
})

export const shopValidationSchema = yup.object({
    title: yup
        .string('Enter Your Shop Title')
        .required('Shop Title is required'),
    region_id: yup
        .number('Select Your Region')
        .required('Region is required'),
    district_id: yup
        .number('Select Your District')
        .required('District is required'),
    street: yup
        .string('Enter Your Street')
        .required('Street is required'),
    home: yup
        .string('Enter Your Home Number')
        .required('Home Number is required'),
    phone: yup
        .string('Enter your Phone Number')
        .required('Phone Number is required')
        .min(14, 'Phone Number should be of minimum 9 characters length')
})

export const productValidationSchema = yup.object({
    title: yup
        .string('Enter Product Title')
        .required('Product Title is required'),
    category_id: yup
        .number('Select Category')
        .required('Category is required'),
    sub_category_id: yup
        .number('Select Sub Category')
        .required('Sub Category is required'),
    brand_id: yup
        .number('Select Brand')
        .required('Brand is required'),
    description: yup
        .string('Enter Product Description')
        .required('Description is required'),
    stock: yup
        .number('Enter Stock')
        .required('Stock is required'),
    price: yup
        .number('Enter Price')
        .required('Price is required'),
    images_count: yup
        .number('Image Count')
        .max(5, 'Images should be maximum 5 items')
})

export const categoryValidationSchema = yup.object({
    category: yup.object({
        title: yup.string('Enter Category Title').required('Category Title is required'),
    }),
    sub_categories: yup.array().of(
        yup.object({
            title: yup.string('Enter Sub Category Title').required('Sub Category Title is required')
        })
    )
})

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']

export const createbannerValidationSchema = yup.object({
    title: yup
        .string('Enter Banner Title')
        .required('Banner Title is required'),
    description: yup
        .string('Enter Banner Description')
        .required('Banner Description is required'),
    image: yup
        .mixed()
        .required('Image is required')
        .test(
            'fileFormat',
            'Unsupported format',
            value => value && SUPPORTED_FORMATS.includes(value.type)
        )
})

export const editbannerValidationSchema = yup.object({
    title: yup
        .string('Enter Banner Title')
        .required('Banner Title is required'),
    description: yup
        .string('Enter Banner Description')
        .required('Banner Description is required'),
})

export const titleValidationSchema = yup.object({
    title: yup
        .string('Enter Title')
        .required('Title is required')
})

export const nameValidationSchema = yup.object({
    name: yup
        .string('Enter Name')
        .strict(true)
        .trim('Name cannot include leading and trailing spaces')
        .required('Name is required')
})