import { Button, Card, CardContent, CircularProgress, Grid, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AvatarUpload from '../common/UploadButton/AvatarUpload'
import ImageUpload from '../common/UploadButton/ImageUpload'
import PhoneMask from '../../components/common/PhoneMask'
import AutocompleteAsync from '../../components/common/AutocompleteAsync/AutocompleteAsync'
import { useEditShop } from '../../app/hooks/useFormik/useEditShop'
import { shopImageURL } from '../../utils/utils'
import { useLocation } from '../../app/hooks/useLocation'
import { useDoublePreview } from '../../app/hooks/usePreview/useDoublePreview'

const EditShopForm = () => {

    const {
        handleSubmit, setFieldValue, getFieldProps, handleBlur, setValues,
        shop, touched, errors, isSubmitting,
    } = useEditShop()

    const {
        regions, region, districts, district, isFetching,
        handleRegionChange, handleDistrictChange
    } = useLocation(setFieldValue, shop.region, shop.district)

    const {
        preview, handleBgUploadChange, handleAvUploadChange,
        handleBgPreviewDeleteClick, handleAvPreviewDeleteClick
    } = useDoublePreview(setValues)

    const handleBgDeleteImage = () => {

    }
    const handleAvDeleteImage = () => {

    }

    return (
        <form onSubmit={handleSubmit}>
            <Card sx={{position: 'relative', overflow: 'visible'}}>
                <ImageUpload
                    handlePrewiewDeleteClick={handleBgPreviewDeleteClick}
                    handleUploadChange={handleBgUploadChange}
                    handleDeleteImage={handleBgDeleteImage}
                    name='bg_image'
                    preview={preview.bg_image}
                    src={shop.bg_image_big ? shopImageURL + shop.bg_image_big.src : undefined}
                    height={200}
                />
                <CardContent sx={{position: 'relative'}}>
                    <AvatarUpload
                        sx={{ marginTop: '-6.5%' }}
                        handlePrewiewDeleteClick={handleAvPreviewDeleteClick}
                        handleUploadChange={handleAvUploadChange}
                        handleDeleteImage={handleAvDeleteImage}
                        name='av_image'
                        preview={preview.av_image}
                        src={shop.av_image ? shopImageURL + shop.av_image.src : undefined}
                        size={50}
                    />
                    <Grid container spacing={2}>
                        <Grid item lg={6}>
                            <TextField
                                label='Shop Title'
                                size='small'
                                fullWidth
                                error={ touched.title && Boolean(errors.title) }
                                helperText={ touched.title && errors.title }
                                { ...getFieldProps('title') }
                            />
                        </Grid>
                        <Grid item lg={6}>
                            <AutocompleteAsync
                                name='region_id'
                                label='Region'
                                error={touched.region_id && Boolean(errors.region_id)}
                                helperText={touched.region_id && errors.region_id}
                                getOptionLabel={option => option.name}
                                options={regions}
                                option={region}
                                handleChange={handleRegionChange}
                                handleBlur={handleBlur}
                            />
                        </Grid>
                        <Grid item lg={6}>
                            <AutocompleteAsync
                                name='district_id'
                                label='District'
                                error={touched.district_id && Boolean(errors.district_id)}
                                helperText={touched.district_id && errors.district_id}
                                getOptionLabel={option => option.name}
                                options={districts}
                                option={district}
                                loading={isFetching}
                                handleChange={handleDistrictChange}
                                handleBlur={handleBlur}
                            />
                        </Grid>
                        <Grid item lg={6}>
                            <TextField
                                label='Street'
                                size='small'
                                fullWidth
                                error={ touched.street && Boolean(errors.street) }
                                helperText={ touched.street && errors.street }
                                { ...getFieldProps('street') }
                            />
                        </Grid>
                        <Grid item lg={6}>
                            <TextField
                                label='Home Number'
                                size='small'
                                fullWidth
                                error={ touched.home && Boolean(errors.home) }
                                helperText={ touched.home && errors.home }
                                { ...getFieldProps('home') }
                            />
                        </Grid>
                        <Grid item lg={6}>
                            <TextField
                                label='Phone Number'
                                size='small'
                                fullWidth
                                InputProps={{inputComponent: PhoneMask, inputProps: {name: 'phone'}}}
                                error={ touched.phone && Boolean(errors.phone) }
                                helperText={ touched.phone && errors.phone }
                                { ...getFieldProps('phone') }
                                placeholder='(00) 000-00-00'
                            />
                        </Grid>
                        <Grid item lg={12}>
                            <Button
                                sx={{float: 'right'}}
                                variant='contained'
                                type='submit'
                                endIcon={
                                    isSubmitting
                                    ?
                                    <CircularProgress color='inherit' size={20}/>
                                    :
                                    <EditIcon/>
                                }
                                disabled={isSubmitting}
                            >
                                Edit
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </form>
    )
}

export default EditShopForm