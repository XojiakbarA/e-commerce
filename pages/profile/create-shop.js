import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import { Autocomplete, Button, Card, CardContent, CardMedia, Grid, TextField } from '@mui/material'
import AvatarUpload from '../../components/common/AvatarUpload/AvatarUpload'
import UploadButton from '../../components/common/AvatarUpload/UploadButton'
import ProfileLayout from '../../components/layout/ProfileLayout/ProfileLayout'
import ProfileTitle from '../../components/profile/ProfileTitle'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { createShopValidationSchema } from '../../utils/validate'
import PhoneMask from '../../components/common/PhoneMask'
import { fetchRegions } from '../../api/user'
import AutocompleteAsync from '../../components/common/AutocompleteAsync/AutocompleteAsync'

const districts = [
    'Bektemir district', 'Chilanzar district', 'Hamza district',
    'Mirobod district', 'Mirzo Ulugbek district', 'Sergeli district',
    'Shaykhontohur district', 'Olmazar district', 'Uchtepa district',
    'Yakkasaray district', 'Yunusabad district'
]

const CreateShop = () => {

    const [preview, setPreview] = useState({bg_image: null, av_image: null})
    const [district, setDistrict] = useState(districts[0])

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            title: '',
            region_id: '',
            district: '',
            street: '',
            home: '',
            phone: '',
            bg_image: null,
            av_image: null
        },
        validationSchema: createShopValidationSchema,
        onSubmit: (data) => {
            console.log(data)
        }
    })

    useEffect(() => {
        const bg_image = formik.values.bg_image
        const reader = new FileReader()
        if (bg_image) {
            reader.readAsDataURL(bg_image)
            reader.onload = () => {
                setPreview(prevState => ({ ...prevState, bg_image: reader.result }))
            }
        }
    }, [formik.values.bg_image])

    useEffect(() => {
        const av_image = formik.values.av_image
        const reader = new FileReader()
        if (av_image) {
            reader.readAsDataURL(av_image)
            reader.onload = () => {
                setPreview(prevState => ({ ...prevState, av_image: reader.result }))
            }
        }
    }, [formik.values.av_image])

    return (
        <ProfileLayout>
            <ProfileTitle
                title='Create Shop'
                titleIcon={<AddBusinessIcon fontSize='large' />}
            />
            <Grid container>
                <Grid item xs={12}>
                    <form onSubmit={formik.handleSubmit}>
                    <Card sx={{position: 'relative'}}>
                        <UploadButton
                            styles={{position: 'absolute', top: 0, left: 0}}
                            title='Select background'
                            setFieldValue={formik.setFieldValue}
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
                                setFieldValue={formik.setFieldValue}
                                value='av_image'
                                src={preview.av_image ?? null}
                            />
                            <Grid container spacing={2}>
                                <Grid item lg={6}>
                                    <TextField
                                        label='First Name'
                                        size='small'
                                        fullWidth
                                        error={ formik.touched.first_name && Boolean(formik.errors.first_name) }
                                        helperText={ formik.touched.first_name && formik.errors.first_name }
                                        { ...formik.getFieldProps('first_name') }
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <TextField
                                        label='Last Name'
                                        size='small'
                                        fullWidth
                                        error={ formik.touched.last_name && Boolean(formik.errors.last_name) }
                                        helperText={ formik.touched.last_name && formik.errors.last_name }
                                        { ...formik.getFieldProps('last_name') }
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <TextField
                                        label='Shop Title'
                                        size='small'
                                        fullWidth
                                        error={ formik.touched.title && Boolean(formik.errors.title) }
                                        helperText={ formik.touched.title && formik.errors.title }
                                        { ...formik.getFieldProps('title') }
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <AutocompleteAsync
                                        formikKey='region_id'
                                        fieldLabel='Region'
                                        fetchOptions={fetchRegions}
                                        fieldError={formik.touched.region_id && Boolean(formik.errors.region_id)}
                                        fieldHelperText={formik.touched.region_id && formik.errors.region_id}
                                        handleBlur={formik.handleBlur}
                                        setFormikValue={formik.setFieldValue}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <Autocomplete
                                        size='small'
                                        options={districts}
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                label='District'
                                                error={ formik.touched.district && Boolean(formik.errors.district) }
                                                helperText={ formik.touched.district && formik.errors.district }
                                                name="district"
                                            />
                                        )}
                                        onBlur={formik.handleBlur}
                                        value={district}
                                        onChange={(e, newValue) => setDistrict(newValue)}
                                        inputValue={formik.values.district}
                                        onInputChange={(e, newValue) => formik.setValues({ ...formik.values, district: newValue })}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <TextField
                                        label='Street'
                                        size='small'
                                        fullWidth
                                        error={ formik.touched.street && Boolean(formik.errors.street) }
                                        helperText={ formik.touched.street && formik.errors.street }
                                        { ...formik.getFieldProps('street') }
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <TextField
                                        label='Home Number'
                                        size='small'
                                        fullWidth
                                        error={ formik.touched.home && Boolean(formik.errors.home) }
                                        helperText={ formik.touched.home && formik.errors.home }
                                        { ...formik.getFieldProps('home') }
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <TextField
                                        label='Phone Number'
                                        size='small'
                                        fullWidth
                                        InputProps={{inputComponent: PhoneMask, inputProps: {name: 'phone'}}}
                                        error={ formik.touched.phone && Boolean(formik.errors.phone) }
                                        helperText={ formik.touched.phone && formik.errors.phone }
                                        { ...formik.getFieldProps('phone') }
                                        placeholder='(00) 000-00-00'
                                    />
                                </Grid>
                                <Grid item lg={12}>
                                    <Button
                                        variant='contained'
                                        type='submit'
                                        sx={{float: 'right'}}
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

export default CreateShop