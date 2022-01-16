import {useEffect, useState} from "react";
import { Badge, Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import ruLocale from 'date-fns/locale/ru'
import {useDispatch, useSelector} from "react-redux";
import {editUser, toggleEditProfileDialog} from "../../../redux/actions";
import {useFormik} from "formik";
import {editProfileValidationSchema} from "../../../utils/validate";
import {appendToFormData, userImageURL} from "../../../utils/utils";
import AvatarUpload from "../../common/AvatarUpload/AvatarUpload";
import PhoneMask from "../../common/PhoneMask";

const EditProfileDialog = () => {

    const dispatch = useDispatch()
    const editProfileDialog = useSelector(state => state.toggle.editProfileDialog)
    const user = useSelector(state => state.user)
    const isLoading = useSelector(state => state.toggle.isLoading)
    const [preview, setPreview] = useState(null)

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

    const closeEditProfileDialog = () => {
        dispatch(toggleEditProfileDialog(false))
        setPreview(null)
        formik.setFieldValue('image', null)
    }

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
            <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="button" fontSize={20}>
                    Edit Profile
                </Typography>
                <IconButton onClick={closeEditProfileDialog}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{marginX: 5, width: 300}}>
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={2}>
                        <Box alignSelf='center' paddingBottom={2}>
                            <AvatarUpload
                                setFieldValue={formik.setFieldValue}
                                value='image'
                                src={preview ?? user.image ? userImageURL + user.image : undefined}
                            />
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
                            label='Phone Number'
                            size='small'
                            InputProps={{inputComponent: PhoneMask, inputProps: {name: 'phone'}}}
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
            </DialogContent>
        </Dialog>
    )
}

export default EditProfileDialog