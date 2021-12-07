import { Stack, Button, Dialog, TextField, Typography, Box, IconButton, CircularProgress } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { loginValidationSchema } from '../../../utils/validate'
import { toggleLoginDialog, toggleRegisterDialog, userLogin } from '../../../redux/actions'

const LoginDialog = () => {

    const loginDialog = useSelector(state => state.toggle.loginDialog)
    const isLoading = useSelector(state => state.isLoading)

    const dispatch = useDispatch()

    const closeLoginDialog = () => dispatch(toggleLoginDialog())
    const openRegisterDialog = () => {
        dispatch(toggleRegisterDialog())
        dispatch(toggleLoginDialog())
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginValidationSchema,
        onSubmit: (data) => {
            dispatch(userLogin(data))
        }
    })

    return(
        <Dialog open={loginDialog} onClose={ closeLoginDialog }>
            <Box sx={{marginX: {xs: 3, sm: 10}, marginY: {xs: 3, sm: 7}, width: {xs: 250, sm: 300}}}>
                <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={ closeLoginDialog }>
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
                        <Button
                            variant='contained'
                            type='submit'
                            endIcon={ isLoading
                                &&
                                <CircularProgress
                                    color='inherit'
                                    size={20}
                                    sx={{position: 'absolute', top: 8, right: 50}}
                                />
                            }
                            disabled={isLoading}
                        >
                            Login
                        </Button>
                        <Typography variant='body1' textAlign='center'>
                            Don`t have Account? <Button size='small' onClick={ openRegisterDialog }>Sign Up</Button>
                        </Typography>
                        <Typography variant='body1' textAlign='center'>
                            Forgot your password? <Button size='small'>Reset It</Button>
                        </Typography>
                    </Stack>
                </form>
            </Box>
        </Dialog>
    )
}

export default LoginDialog