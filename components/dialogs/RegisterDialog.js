import { Dialog, Box, IconButton, Typography, Stack, TextField, Button, CircularProgress, DialogContent, DialogTitle } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import { registerValidationSchema } from "../../utils/validate"
import { userRegister } from "../../redux/actions"
import { useToggle } from "../../app/hooks/useToggle"


const RegisterDialog = () => {

    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.toggle.isLoading)
    
    const { registerDialog, closeRegisterDialog, openLoginDialog } = useToggle()

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
            <DialogTitle sx={{display: 'flex', alignItems: 'end', justifyContent: 'space-between'}}>
                <Typography variant="button" fontSize={20}>
                    Register
                </Typography>
                <IconButton onClick={closeRegisterDialog}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{marginX: 7, marginY: 3, width: 300}}>
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
                </DialogContent>
        </Dialog>
    )
}

export default RegisterDialog