import { Typography, Stack, TextField, Button, CircularProgress } from "@mui/material"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { useRegister } from "../../app/hooks/useFormik/useRegister"
import { toggleLoginDialog, toggleRegisterDialog } from "../../app/store/actions/dialogActions"

const RegisterForm = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const { handleSubmit, getFieldProps, touched, errors, isSubmitting } = useRegister()

    const openLoginDialog = () => {
        if (router.pathname === '/register') {
            router.push('/login')
        } else {
            dispatch(toggleRegisterDialog(false))
            dispatch(toggleLoginDialog(true))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={3} marginTop={1}>
                <TextField
                    label='First Name'
                    size='small'
                    error={ touched.first_name && Boolean(errors.first_name) }
                    helperText={ touched.first_name && errors.first_name }
                    { ...getFieldProps('first_name') }
                />
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
                <TextField
                    label='Confirm Password'
                    size='small'
                    type='password'
                    error={ touched.password_confirmation && Boolean(errors.password_confirmation) }
                    helperText={ touched.password_confirmation && errors.password_confirmation }
                    { ...getFieldProps('password_confirmation') }
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
                    Register
                </Button>
                <Typography variant='body1' textAlign='center'>
                    Do you have Account? <Button size='small' onClick={ openLoginDialog }>Log In</Button>
                </Typography>
            </Stack>
        </form>
    )
}

export default RegisterForm