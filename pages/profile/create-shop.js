import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import { Button, Card, CardContent, CardMedia, CircularProgress, Grid, TextField } from '@mui/material'
import AvatarUpload from '../../components/common/AvatarUpload/AvatarUpload'
import UploadButton from '../../components/common/AvatarUpload/UploadButton'
import ProfileLayout from '../../components/layout/ProfileLayout/ProfileLayout'
import ProfileTitle from '../../components/profile/ProfileTitle'
import PhoneMask from '../../components/common/PhoneMask'
import AutocompleteAsync from '../../components/common/AutocompleteAsync/AutocompleteAsync'
import { getRegions } from '../../redux/actions'
import { useCreateShop } from '../../app/hooks/useFormik/useCreateShop'
import { wrapper } from '../../redux/store'

const CreateShop = () => {

    const {
        handleSubmit, getFieldProps, setFieldValue, handleBlur,
        handleRegionChange, handleDistrictChange,
        touched, errors, isSubmitting,
        preview, regions, districts, region, district, isFetching
    } = useCreateShop()

    return (
        <ProfileLayout>
            <ProfileTitle
                title='Create Shop'
                titleIcon={<AddBusinessIcon fontSize='large' />}
            />
            <Grid container>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit}>
                    <Card sx={{position: 'relative'}}>
                        <UploadButton
                            styles={{position: 'absolute', top: 0, left: 0}}
                            title='Select background'
                            setFieldValue={setFieldValue}
                            value='bg_image'
                        />
                        <CardMedia
                            component="img"
                            height="200"
                            image={preview.bg_image ?? '/images/shop/no-bg.jpeg'}
                            alt={preview.bg_image}
                        />
                        
                        <CardContent sx={{position: 'relative'}}>
                            <AvatarUpload
                                styles={{marginTop: '-80px'}}
                                title='Select Avatar'
                                setFieldValue={setFieldValue}
                                value='av_image'
                                src={preview.av_image ?? null}
                            />
                            <Grid container spacing={2}>
                                <Grid item lg={6}>
                                    <TextField
                                        label='First Name'
                                        size='small'
                                        fullWidth
                                        error={ touched.first_name && Boolean(errors.first_name) }
                                        helperText={ touched.first_name && errors.first_name }
                                        { ...getFieldProps('first_name') }
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <TextField
                                        label='Last Name'
                                        size='small'
                                        fullWidth
                                        error={ touched.last_name && Boolean(errors.last_name) }
                                        helperText={ touched.last_name && errors.last_name }
                                        { ...getFieldProps('last_name') }
                                    />
                                </Grid>
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
                                        endIcon={ isSubmitting
                                            &&
                                            <CircularProgress
                                                color='inherit'
                                                size={20}
                                            />
                                        }
                                        disabled={isSubmitting}
                                    >
                                        Create
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    </form>
                </Grid>
            </Grid>
        </ProfileLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({params, query}) => {

    await dispatch(getRegions())

})

export default CreateShop