import { Stack, Button, TextField, Typography, CircularProgress, Checkbox, FormControlLabel } from '@mui/material'
import { useLogin } from '../../app/hooks/useFormik/useLogin'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { toggleLoginDialog, toggleRegisterDialog } from '../../app/store/actions/dialogActions'

const LoginForm = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const { handleSubmit, getFieldProps, touched, errors, isSubmitting } = useLogin()

    const openRegisterDialog = () => {
        if (router.pathname === '/login') {
            router.push('/register')
        } else {
            dispatch(toggleLoginDialog(false))
            dispatch(toggleRegisterDialog(true))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={3} marginTop={1}>
                <TextField
                    label='Email'
                    size='small'
                    error={ touched.email && Boolean(errors.email) }
                    helperText={ touched.email && errors.email }
                    { ...getFieldProps('email') }
                />
                <TextField
                    label='Password'
                    size='small'
                    type='password'
                    error={ touched.password && Boolean(errors.password) }
                    helperText={ touched.password && errors.password }
                    { ...getFieldProps('password') }
                />
                <FormControlLabel
                    control={
                        <Checkbox { ...getFieldProps('remember') }/>
                        }
                    label='Remember Me'
                />
                <Button
                    variant='contained'
                    type='submit'
                    endIcon={
                        isSubmitting &&
                        <CircularProgress
                            color='inherit'
                            size={20}
                            sx={{position: 'absolute', top: '25%', right: 10}}
                        />
                    }
                    disabled={isSubmitting}
                >
                    Login
                </Button>
                <Stack spacing={1}>
                    <Typography variant='body1' textAlign='center'>
                        Don`t have Account? <Button size='small' onClick={ openRegisterDialog }>Sign Up</Button>
                    </Typography>
                    <Typography variant='body1' textAlign='center'>
                        Forgot your password? <Button size='small'>Reset It</Button>
                    </Typography>
                </Stack>
            </Stack>
        </form>
    )
}

export default LoginForm