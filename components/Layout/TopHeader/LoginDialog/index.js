import { Stack, Button, Dialog, TextField, Typography, Box, IconButton, CircularProgress } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Link from 'next/link'
import { toggleLoginDialog, setLoading, setSnackbar } from '../../../../redux/actions/main'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { login } from '../../../../api/api'
import { loginValidationSchema } from '../../../../utils/validate'
import { getUser } from '../../../../redux/actions/thunk'


const LoginDialog = () => {

    const dialog = useSelector(state => state.loginDialog)
    const isLoading = useSelector(state => state.isLoading)

    const dispatch = useDispatch()
    const closeDialog = () => dispatch(toggleLoginDialog())

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (data) => {
            dispatch(setLoading(true))
            await login(data)
            getUser(dispatch)
            dispatch(setLoading(false))
            dispatch(setSnackbar({isOpen: true, text: 'You are logged in!'}))
            dispatch(toggleLoginDialog())
        }
    })

    return(
        <Dialog open={dialog} onClose={ closeDialog }>
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