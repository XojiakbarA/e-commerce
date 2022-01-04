import {forwardRef, useEffect, useState} from "react";
import { Avatar, Badge, Box, Button, CircularProgress, Dialog, IconButton, Input, Stack, TextField, Typography } from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import ruLocale from 'date-fns/locale/ru'
import {IMaskInput} from "react-imask";
import {useDispatch, useSelector} from "react-redux";
import {editUser, toggleEditProfileDialog} from "../../../redux/actions";
import {useFormik} from "formik";
import {editProfileValidationSchema} from "../../../utils/validate";
import {PhotoCamera} from "@mui/icons-material";
import {appendToFormData, userImageURL} from "../../../utils/utils";

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

const UploadButton = ({setFieldValue}) => {
    return (
        <label htmlFor="icon-button-file">
            <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                sx={{display: 'none'}}
                name='image'
                onChange={e => setFieldValue('image', e.target.files[0])}
            />
            <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
            </IconButton>
        </label>
    )
}

const EditProfileDialog = () => {

    const dispatch = useDispatch()
    const editProfileDialog = useSelector(state => state.toggle.editProfileDialog)
    const user = useSelector(state => state.user?.data)
    const isLoading = useSelector(state => state.toggle.isLoading)
    const [preview, setPreview] = useState(null)

    const closeEditProfileDialog = () => {
        dispatch(toggleEditProfileDialog(false))
        setPreview(null)
    }

    const formik = useFormik({
        initialValues: {
            first_name: user?.first_name,
            last_name: user?.last_name ?? '',
            email: user?.email,
            phone: user?.phone ?? '',
            birth_date: user?.birth_date,
            image: null
        },
        validationSchema: editProfileValidationSchema,
        onSubmit: (data) => {
            const formData = appendToFormData(data)
            dispatch(editUser(formData, user.id))
        },
        enableReinitialize: true
    })

    useEffect(() => {
        const image = formik.values.image
        const reader = new FileReader()
        if (image) {
            reader.readAsDataURL(image)
            reader.onload = () => {
                setPreview(reader.result)
            }
        }
    }, [formik.values.image])

    return (
        <Dialog open={editProfileDialog} onClose={closeEditProfileDialog}>
            <Box sx={{marginX: {xs: 3, sm: 7}, marginY: {xs: 3, sm: 7}, width: {xs: 250, sm: 300}}}>
                <Typography variant='h5' textAlign='center' paddingBottom={2}>
                    Edit Profile
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={2}>
                        <Box alignSelf='center' paddingBottom={2}>
                            <Badge
                                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                badgeContent={<UploadButton setFieldValue={formik.setFieldValue}/>}
                            >
                                <Avatar src={preview ?? userImageURL + user?.image} sx={{height: 70, width: 70}} />
                            </Badge>
                        </Box>
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