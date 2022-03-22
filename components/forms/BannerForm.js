import { Button, CircularProgress, FormHelperText, Grid, Stack, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import ImageUpload from '../common/UploadButton/ImageUpload'
import { bannerImageURL } from "../../utils/utils"
import { useBanner } from "../../app/hooks/useFormik/useBanner"
import { useSinglePreview } from "../../app/hooks/usePreview/useSinglePreview"
import { toggleDeleteBannerDialog } from "../../app/store/actions/dialogActions"
import { useDispatch } from "react-redux"

const BannerForm = ({ banner, onSubmit }) => {

    const dispatch = useDispatch()

    const {
        touched, errors, isSubmitting,
        handleSubmit, getFieldProps, setValues, handleDeleteImageClick
    } = useBanner(banner, onSubmit)

    const { preview, handlePreviewDeleteClick, handleUploadChange } = useSinglePreview(setValues, banner?.image)

    const dialogText = `Do you really want to delete the "${banner?.title}"?`

    const openDeleteBannerDialog = () => {
        dispatch(toggleDeleteBannerDialog(true, dialogText))
    }

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
                <Grid item xs={12} display='flex' flexDirection='column' alignItems='center'>
                    <ImageUpload
                        handlePrewiewDeleteClick={handlePreviewDeleteClick}
                        handleUploadChange={handleUploadChange}
                        handleDeleteImage={handleDeleteImageClick}
                        name='image'
                        preview={preview}
                        src={banner?.image ? bannerImageURL + banner?.image : undefined}
                        width={200}
                        height={200}
                    />
                    <FormHelperText error>{ touched.image && errors.image}</FormHelperText>
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='end'>
                    <Stack direction='row' spacing={2}>
                        {
                            banner &&
                            <Button
                                size='small'
                                variant='outlined'
                                color='error'
                                onClick={ openDeleteBannerDialog }
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
                        }
                        <Button
                            size='small'
                            variant='contained'
                            type='submit'
                            endIcon={
                                isSubmitting
                                ?
                                <CircularProgress color='inherit' size={20}/>
                                :
                                banner ? <SaveIcon/> : <AddIcon/>
                            }
                            disabled={isSubmitting}
                        >
                            { banner ? 'Save' : 'Create' }
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    )
}

export default BannerForm