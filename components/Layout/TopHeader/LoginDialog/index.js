import { Stack, Button, Dialog, TextField, Typography, Box, IconButton } from '@mui/material'
import Link from 'next/link'
import CloseIcon from '@mui/icons-material/Close'
import { closeLoginDialog } from '../../../../redux/actions/main'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { login } from '../../../../api/api'

const LoginDialog = () => {

    const isOpen = useSelector(state => state.loginDialog.isOpen)

    const dispatch = useDispatch()

    const closeDialog = () => dispatch(closeLoginDialog())

    

    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required')
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (data) => {
            login(data)
        }
    })

    return(
        <Dialog open={isOpen} onClose={ closeDialog }>
            <Box sx={{marginX: {xs: 3, sm: 10}, marginY: {xs: 3, sm: 7}, width: {xs: 250, sm: 300}}}>
                <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={ closeDialog }>
                    <CloseIcon />
                </IconButton>
                <Typography variant='h5' textAlign='center' paddingBottom={5}>
                    Welcome to e-commerce
                </Typography>

                <form onSubmit={formik.handleSubmit} >
                    <Stack spacing={3}>

                        <TextField
                            label='Email'
                            size='small'
                            error={ formik.touched.email && Boolean(formik.errors.email) }
                            helperText={ formik.touched.email && formik.errors.email }
                            { ...formik.getFieldProps('email') }
                        />
                        <TextField
                            label='Password'
                            size='small'
                            type='password'
                            error={ formik.touched.password && Boolean(formik.errors.password) }
                            helperText={ formik.touched.password && formik.errors.password }
                            { ...formik.getFieldProps('password') }
                        />
                        <Button variant='contained' type='submit'>Login</Button>
                        
                        <Typography variant='body1' textAlign='center'>
                            Don`t have Account? <Link href='/signup'><a style={{textDecoration: 'underline'}}> Sign Up </a></Link>
                        </Typography>
                        <Typography variant='body1' textAlign='center'>
                            Forgot your password? <Link href='/resetit'><a style={{textDecoration: 'underline'}}> Reset It </a></Link>
                        </Typography>
                    </Stack>
                </form>

            </Box>
        </Dialog>
    )
}

export default LoginDialog