import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material"
import { appURL } from "../../utils/utils"
import PhoneMaskInput from "../common/Input/PhoneMaskInput"
import AvatarUpload from "../common/UploadButton/AvatarUpload"
import CustomDataPicker from "../admin/DataGrid/CustomDataPicker"
import { useEditProfile } from "../../app/hooks/useFormik/useEditProfile"
import { useDispatch, useSelector } from "react-redux"
import { useSinglePreview } from "../../app/hooks/usePreview/useSinglePreview"
import { toggleDeleteProfileImageDialog } from "../../app/store/actions/dialogActions"

const EditProfileForm = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    const { handleSubmit, getFieldProps, setValues, values, touched, errors, isSubmitting } = useEditProfile()

    const { preview, handleUploadChange, handlePreviewDeleteClick } = useSinglePreview(setValues)

    const dialogText = `Do you really want to delete the image?`

    const openDeleteProfileImageDialog = () => {
        dispatch(toggleDeleteProfileImageDialog(true, dialogText, user.image.id))
    }

    return (
        <form onSubmit={handleSubmit} style={{ paddingTop: 7, paddingBottom: 10}}>
            <Stack spacing={2}>
                <Box alignSelf='center'>
                    <AvatarUpload
                        handlePrewiewDeleteClick={handlePreviewDeleteClick}
                        handleUploadChange={handleUploadChange}
                        handleDeleteImage={ openDeleteProfileImageDialog }
                        name='image'
                        preview={preview}
                        src={user.image ? appURL + user.image.src : undefined}
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
                    InputProps={{inputComponent: PhoneMaskInput, inputProps: {name: 'phone'}}}
                    error={ touched.phone && Boolean(errors.phone) }
                    helperText={ touched.phone && errors.phone }
                    { ...getFieldProps('phone') }
                    placeholder='(00) 000-00-00'
                />
                <CustomDataPicker
                    size='small'
                    label='Birth Date'
                    name='birth_date'
                    value={values.birth_date}
                    onChange={(value) => setValues(prevValues => ({ ...prevValues, birth_date: value }))}
                />
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
            </Stack>
        </form>
    )
}

export default EditProfileForm