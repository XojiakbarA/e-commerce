import { Dialog, IconButton, Typography, Stack, TextField, Button, CircularProgress, DialogContent, DialogTitle } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { useToggle } from "../../app/hooks/useToggle"
import { useRegister } from "../../app/hooks/useFormik/useRegister"


const RegisterDialog = () => {

    const { registerDialog, closeRegisterDialog, openLoginDialog } = useToggle()

    const { handleSubmit, getFieldProps, touched, errors, isSubmitting } = useRegister()

    return (
        <Dialog open={registerDialog} onClose={ closeRegisterDialog }>
            <DialogTitle sx={{display: 'flex', alignItems: 'end', justifyContent: 'space-between'}}>
                <Typography variant="button" fontSize={20}>
                    Register
                </Typography>
                <IconButton onClick={closeRegisterDialog}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{marginX: 7, marginY: 3, width: 300}}>
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
                            endIcon={ isSubmitting &&
                                <CircularProgress
                                    color='inherit'
                                    size={20}
                                    sx={{position: 'absolute', top: 8, right: 50}}
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
                </DialogContent>
        </Dialog>
    )
}

export default RegisterDialog