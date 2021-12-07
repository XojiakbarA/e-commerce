import { Dialog, Box, IconButton, Typography, Stack, TextField, Button, CircularProgress } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import { registerValidationSchema } from "../../../utils/validate"
import { toggleLoginDialog, toggleRegisterDialog, userRegister } from "../../../redux/actions"


const RegisterDialog = () => {

    const dispatch = useDispatch()
    const registerDialog = useSelector(state => state.toggle.registerDialog)
    const isLoading = useSelector(state => state.isLoading)
    
    const closeRegisterDialog = () => dispatch(toggleRegisterDialog())
    const openLoginDialog = () => {
        dispatch(toggleRegisterDialog())
        dispatch(toggleLoginDialog())
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        },
        validationSchema: registerValidationSchema,
        onSubmit: (data) => {
            dispatch(userRegister(data))
        }
    })

    return (
        <Dialog open={registerDialog} onClose={ closeRegisterDialog }>
            <Box sx={{marginX: {xs: 3, sm: 10}, marginY: {xs: 3, sm: 7}, width: {xs: 250, sm: 300}}}>
                <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={ closeRegisterDialog }>
                    <CloseIcon />
                </IconButton>
                <Typography variant='h5' textAlign='center' paddingBottom={5}>
                    Create Your Account
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            label='Name'
                            size='small'
                            error={ formik.touched.name && Boolean(formik.errors.name) }
                            helperText={ formik.touched.name && formik.errors.name }
                            { ...formik.getFieldProps('name') }
                        />
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
                        <TextField
                            label='Confirm Password'
                            size='small'
                            type='password'
                            error={ formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation) }
                            helperText={ formik.touched.password_confirmation && formik.errors.password_confirmation }
                            { ...formik.getFieldProps('password_confirmation') }
                        />
                        <Button
                            variant='contained'
                            type='submit'
                            endIcon={ isLoading &&
                                <CircularProgress
                                    color='inherit'
                                    size={20}
                                    sx={{position: 'absolute', top: 8, right: 50}}
                                />
                            }
                            disabled={isLoading}
                        >
                            Register
                        </Button>
                        <Typography variant='body1' textAlign='center'>
                            Do you have Account? <Button size='small' onClick={ openLoginDialog }>Log In</Button>
                        </Typography>
                    </Stack>
                </form>
            </Box>
        </Dialog>
    )
}

export default RegisterDialog