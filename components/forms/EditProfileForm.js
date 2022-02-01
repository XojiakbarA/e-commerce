import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material"
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab"
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import ruLocale from 'date-fns/locale/ru'
import {userImageURL} from "../../utils/utils"
import PhoneMask from "../common/PhoneMask"
import AvatarMenu from "../common/AvatarMenu"
import { useEditProfile } from "../../app/hooks/useFormik/useEditProfile"
import { useSelector } from "react-redux"
import { useSinglePreview } from "../../app/hooks/usePreview/useSinglePreview"

const EditProfileForm = () => {

    const user = useSelector(state => state.user)

    const {
        handleSubmit, getFieldProps, setFieldValue, setPreview, setValues,
        values, touched, errors, isSubmitting
    } = useEditProfile()

    const { preview, handleUploadChange } = useSinglePreview(setValues)

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Box alignSelf='center' paddingBottom={2}>
                    <AvatarMenu
                        handleUploadChange={handleUploadChange}
                        setPreview={setPreview}
                        value='image'
                        src={preview ?? (user.image ? userImageURL + user.image.src : undefined)}
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
                        onChange={(value) => setFieldValue('birth_date', value)}
                    />
                </LocalizationProvider>
                <Button
                    size='small'
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
                    Save
                </Button>
                <Button
                    size='small'
                    variant='outlined'
                    onClick={e => closeEditProfileDialog(setPreview, setFieldValue)}
                >
                    Cancel
                </Button>
            </Stack>
        </form>
    )
}

export default EditProfileForm