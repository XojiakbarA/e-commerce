import { Avatar, Badge, Box, Button, CircularProgress, FormHelperText, Grid, IconButton, Stack, TextField } from "@mui/material"
import { styled } from "@mui/material/styles"
import AddIcon from '@mui/icons-material/Add'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { useSinglePreview } from "../../app/hooks/usePreview/useSinglePreview"
import { useAddBanner } from "../../app/hooks/useFormik/useAddBanner"

const Input = styled('input')({
    display: 'none'
})

const AddBannerForm = () => {

    const{
        touched, errors, isSubmitting,
        handleSubmit, getFieldProps, setValues
    } = useAddBanner()

    const { preview, handlePreviewDeleteClick, handleUploadChange } = useSinglePreview(setValues)

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
                    <Badge
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                        badgeContent={
                            preview &&
                            <IconButton color='error' onClick={handlePreviewDeleteClick}>
                                <RemoveCircleIcon/>
                            </IconButton>
                        }
                    >
                        {
                            preview
                            ?
                            <Avatar
                                sx={{ width: 150, height: 150 }}
                                variant='rounded'
                                src={preview}
                            />
                            :
                            <Box sx={{
                                width: 150,
                                height: 150,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: touched.image && errors.image ? '1px dashed red' : null,
                                borderRadius: 1
                            }}>
                                <label htmlFor="images">
                                    <Input
                                        accept="image/*"
                                        id="images"
                                        type="file"
                                        onChange={handleUploadChange}
                                    />
                                    <IconButton component='span'>
                                        <AddPhotoAlternateIcon fontSize="large"/>
                                    </IconButton>
                                </label>
                            </Box>
                        }
                    </Badge>
                    <FormHelperText error>{ touched.image && errors.image}</FormHelperText>
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
                                <AddIcon/>
                            }
                            disabled={isSubmitting}
                        >
                            Create
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    )
}

export default AddBannerForm