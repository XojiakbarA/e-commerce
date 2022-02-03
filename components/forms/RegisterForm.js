import { Typography, Stack, TextField, Button, CircularProgress } from "@mui/material"
import { useRegister } from "../../app/hooks/useFormik/useRegister"
import { useToggle } from "../../app/hooks/useToggle"

const RegisterForm = () => {

    const { openLoginDialog } = useToggle()

    const { handleSubmit, getFieldProps, touched, errors, isSubmitting } = useRegister()

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    label='First Name'
                    size='small'
                    error={ touched.name && Boolean(errors.name) }
                    helperText={ touched.name && errors.name }
                    { ...getFieldProps('name') }
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