import { Stack, Button, Dialog, TextField, Typography, Box, IconButton, CircularProgress, Checkbox, FormControlLabel, DialogTitle, DialogContent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { loginValidationSchema } from '../../utils/validate'
import { userLogin } from '../../redux/actions'
import { useToggle } from '../../app/hooks/useToggle'

const LoginDialog = () => {

    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.toggle.isLoading)

    const { loginDialog, closeLoginDialog, openRegisterDialog } = useToggle()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: false
        },
        validationSchema: loginValidationSchema,
        onSubmit: (data) => {
            dispatch(userLogin(data))
        }
    })

    return(
        <Dialog open={loginDialog} onClose={ closeLoginDialog }>
            <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="button">
                    Login
                </Typography>
                <IconButton onClick={closeLoginDialog}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
                <DialogContent sx={{marginX: 7, marginY: 3, width: 300}}>
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={3} marginTop={1}>
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
                        <FormControlLabel control={<Checkbox { ...formik.getFieldProps('remember') } />} label='Remember Me' />
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
                </DialogContent>
        </Dialog>
    )
}

export default LoginDialog