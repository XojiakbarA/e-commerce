import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material"
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab"
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import ruLocale from 'date-fns/locale/ru'
import {userImageURL} from "../../utils/utils"
import PhoneMask from "../common/PhoneMask"
import AvatarUpload from "../common/UploadButton/AvatarUpload"
import { useEditProfile } from "../../app/hooks/useFormik/useEditProfile"
import { useDispatch, useSelector } from "react-redux"
import { useSinglePreview } from "../../app/hooks/usePreview/useSinglePreview"
import { useToggle } from '../../app/hooks/useToggle'
import { deleteUserImage } from "../../app/store/actions/async/user"

const EditProfileForm = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const isLoading = useSelector(state => state.toggle.isLoading)

    const { handleSubmit, getFieldProps, setValues, values, touched, errors, isSubmitting } = useEditProfile()

    const { preview, handleUploadChange, handlePreviewDeleteClick } = useSinglePreview(setValues)

    const { closeEditProfileDialog, openDeleteProfileImageDialog } = useToggle()

    const dialogText = `Do you really want to delete the image?`

    return (
        <form onSubmit={handleSubmit} style={{ paddingTop: 7}}>
            <Stack spacing={2}>
                <Box alignSelf='center'>
                    <AvatarUpload
                        handlePrewiewDeleteClick={handlePreviewDeleteClick}
                        handleUploadChange={handleUploadChange}
                        handleDeleteImage={e => openDeleteProfileImageDialog(dialogText, user.image.id)}
                        isLoading={isLoading}
                        name='image'
                        preview={preview}
                        src={user.image ? userImageURL + user.image.src : undefined}
                        size={70}
                    />
                </Box>
                <TextField
                    label='First Name'
                    size='small'
                    error={ touched.first_name && Boolean(errors.first_name) }
                    helperText={ touched.first_name && errors.first_name }
                    { ...getFieldProps('first_name') }
                />
                <TextField
                    label='Last Name'
                    size='small'
                    error={ touched.last_name && Boolean(errors.last_name) }
                    helperText={ touched.last_name && errors.last_name }
                    { ...getFieldProps('last_name') }
                />
                <TextField
                    label='Email'
                    size='small'
                    error={ touched.email && Boolean(errors.email) }
                    helperText={ touched.email && errors.email }
                    { ...getFieldProps('email') }
                />
                <TextField
                    label='Phone Number'
                    size='small'
                    InputProps={{inputComponent: PhoneMask, inputProps: {name: 'phone'}}}
                    error={ touched.phone && Boolean(errors.phone) }
                    helperText={ touched.phone && errors.phone }
                    { ...getFieldProps('phone') }
                    placeholder='(00) 000-00-00'
                />
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                    <DesktopDatePicker
                        renderInput={(params) => <TextField {...params} size='small'/>}
                        mask='__.__.____'
                        label="Birth Date"
                        name='birth_date'
                        value={values.birth_date}
                        onChange={(value) => setValues(prevValues => ({ ...prevValues, birth_date: value }))}
                    />
                </LocalizationProvider>
                <Button
                    size='small'
                    variant='contained'
                    type='submit'
                    endIcon={
                        isSubmitting &&
                        <CircularProgress
                            color='inherit'
                            size={20}
                            sx={{position: 'absolute', right: 10, top: '25%'}}
                        />
                    }
                    disabled={isSubmitting}
                >
                    Save
                </Button>
                <Button
                    size='small'
                    variant='outlined'
                    onClick={ closeEditProfileDialog }
                >
                    Cancel
                </Button>
            </Stack>
        </form>
    )
}

export default EditProfileForm