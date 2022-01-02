import {forwardRef} from "react";
import {Box, Button, CircularProgress, Dialog, Stack, TextField, Typography} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import ruLocale from 'date-fns/locale/ru'
import {IMaskInput} from "react-imask";
import {useDispatch, useSelector} from "react-redux";
import {editUser, toggleEditProfileDialog} from "../../../redux/actions";
import {useFormik} from "formik";
import {editProfileValidationSchema} from "../../../utils/validate";

const TextMaskCustom = forwardRef(function TextMaskCustom({onChange, name, ...other}, ref) {
    return (
        <IMaskInput
            {...other}
            mask="(00) 000-00-00"
            name={name}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name, value } })}
            overwrite
        />
    );
});

const EditProfileDialog = () => {

    const dispatch = useDispatch()
    const editProfileDialog = useSelector(state => state.toggle.editProfileDialog)
    const user = useSelector(state => state.user?.data)
    const isLoading = useSelector(state => state.toggle.isLoading)

    const closeEditProfileDialog = () => {
        dispatch(toggleEditProfileDialog(false))
    }

    const formik = useFormik({
        initialValues: {
            first_name: user?.first_name,
            last_name: user?.last_name ?? '',
            email: user?.email,
            phone: user?.phone ?? '',
            birth_date: user?.birth_date
        },
        validationSchema: editProfileValidationSchema,
        onSubmit: (data) => {
            dispatch(editUser(data, user.id))
        },
        enableReinitialize: true
    })

    return (
        <Dialog open={editProfileDialog} onClose={closeEditProfileDialog}>
            <Box sx={{marginX: {xs: 3, sm: 7}, marginY: {xs: 3, sm: 7}, width: {xs: 250, sm: 300}}}>
                <Typography variant='h5' textAlign='center' paddingBottom={5}>
                    Edit Profile
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label='First Name'
                            size='small'
                            error={ formik.touched.first_name && Boolean(formik.errors.first_name) }
                            helperText={ formik.touched.first_name && formik.errors.first_name }
                            { ...formik.getFieldProps('first_name') }
                        />
                        <TextField
                            label='Last Name'
                            size='small'
                            error={ formik.touched.last_name && Boolean(formik.errors.last_name) }
                            helperText={ formik.touched.last_name && formik.errors.last_name }
                            { ...formik.getFieldProps('last_name') }
                        />
                        <TextField
                            label='Email'
                            size='small'
                            error={ formik.touched.email && Boolean(formik.errors.email) }
                            helperText={ formik.touched.email && formik.errors.email }
                            { ...formik.getFieldProps('email') }
                        />
                        <TextField
                            label='Phone'
                            size='small'
                            InputProps={{inputComponent: TextMaskCustom, inputProps: {name: 'phone'}}}
                            error={ formik.touched.phone && Boolean(formik.errors.phone) }
                            helperText={ formik.touched.phone && formik.errors.phone }
                            { ...formik.getFieldProps('phone') }
                            placeholder='(00) 000-00-00'
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                            <DesktopDatePicker
                                renderInput={(params) => <TextField {...params} size='small'/>}
                                mask='__.__.____'
                                label="Birth Date"
                                name='birth_date'
                                value={formik.values.birth_date}
                                onChange={(value) => formik.setFieldValue('birth_date', value)}
                            />
                        </LocalizationProvider>
                        <Button
                            size='small'
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
                            Save
                        </Button>
                        <Button size='small' variant='outlined' onClick={closeEditProfileDialog}>Cancel</Button>
                    </Stack>
                </form>
            </Box>
        </Dialog>
    )
}

export default EditProfileDialog