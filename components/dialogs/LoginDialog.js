import { Stack, Button, Dialog, TextField, Typography, IconButton, CircularProgress, Checkbox, FormControlLabel, DialogTitle, DialogContent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useToggle } from '../../app/hooks/useToggle'
import { useLogin } from '../../app/hooks/useFormik/useLogin'

const LoginDialog = () => {

    const { loginDialog, closeLoginDialog, openRegisterDialog } = useToggle()

    const { handleSubmit, getFieldProps, touched, errors, isSubmitting } = useLogin()

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
                            endIcon={ isSubmitting
                                &&
                                <CircularProgress
                                    color='inherit'
                                    size={20}
                                    sx={{position: 'absolute', top: 8, right: 50}}
                                />
                            }
                            disabled={isSubmitting}
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