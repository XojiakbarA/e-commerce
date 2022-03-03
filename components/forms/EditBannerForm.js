import { Badge, Button, CircularProgress, Grid, IconButton, Stack, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import AvatarUpload from '../common/AvatarUpload/AvatarUpload'
import { bannerImageURL } from "../../utils/utils"
import { useEditBanner } from "../../app/hooks/useFormik/useEditBanner"
import { useSinglePreview } from "../../app/hooks/usePreview/useSinglePreview"

const EditBannerForm = ({ banner }) => {

    const {
        touched, errors, isSubmitting,
        handleSubmit, getFieldProps, setValues, handleDeleteClick
    } = useEditBanner(banner)

    const { preview, handlePreviewDeleteClick, handleUploadChange } = useSinglePreview(setValues, banner.image)

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label='Title'
                        size='small'
                        error={ touched.title && Boolean(errors.title) }
                        helperText={ touched.title && errors.title }
                        { ...getFieldProps('title') }
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={5}
                        error={ touched.description && Boolean(errors.description) }
                        helperText={ touched.description && errors.description }
                        { ...getFieldProps('description') }
                    />
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='center'>
                    <Badge
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                        badgeContent={
                            preview &&
                            <IconButton color='error' onClick={handlePreviewDeleteClick}>
                                <RemoveCircleIcon/>
                            </IconButton>
                        }
                    >
                        <AvatarUpload
                            variant='rounded'
                            size={150}
                            src={preview ?? bannerImageURL + banner.image}
                            onChange={handleUploadChange}
                        />
                    </Badge>
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='end'>
                    <Stack direction='row' spacing={2}>
                        <Button
                            size='small'
                            variant='contained'
                            type='submit'
                            endIcon={
                                isSubmitting
                                ?
                                <CircularProgress color='inherit' size={20}/>
                                :
                                <SaveIcon/>
                            }
                            disabled={isSubmitting}
                        >
                            Save
                        </Button>
                        <Button
                            size='small'
                            variant='outlined'
                            color='error'
                            onClick={handleDeleteClick}
                            endIcon={
                                isSubmitting
                                ?
                                <CircularProgress color='inherit' size={20}/>
                                :
                                <DeleteIcon/>
                            }
                        >
                            Delete
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    )
}

export default EditBannerForm