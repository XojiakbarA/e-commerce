import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import { Button, Card, CardContent, CardMedia, CircularProgress, Grid, TextField } from '@mui/material'
import AvatarUpload from '../../components/common/AvatarUpload/AvatarUpload'
import UploadButton from '../../components/common/AvatarUpload/UploadButton'
import ProfileLayout from '../../components/layout/ProfileLayout/ProfileLayout'
import ProfileTitle from '../../components/profile/ProfileTitle'
import { useCallback, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { createShopValidationSchema } from '../../utils/validate'
import PhoneMask from '../../components/common/PhoneMask'
import { fetchDistricts, fetchRegions } from '../../api/user'
import AutocompleteAsync from '../../components/common/AutocompleteAsync/AutocompleteAsync'
import { appendToFormData } from '../../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { createShop } from '../../redux/actions'
import { useRouter } from 'next/router'

const CreateShop = () => {

    const dispatch = useDispatch()
    const router = useRouter()
    const isLoading = useSelector(state => state.toggle.isLoading)
    const [preview, setPreview] = useState({bg_image: null, av_image: null})

    const [regions, setRegions] = useState([])
    const [region, setRegion] = useState(null)
    const regionsLoading = regions.length === 0

    const [districts, setDistricts] = useState([])
    const [district, setDistrict] = useState(null)
    const districtsLoading = districts.length === 0

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            title: '',
            region_id: '',
            district_id: '',
            street: '',
            home: '',
            phone: '',
            bg_image: null,
            av_image: null
        },
        validationSchema: createShopValidationSchema,
        onSubmit: async (data) => {
            const formData = appendToFormData(data)
            await Promise.all([
                dispatch(createShop(formData))
            ])
            router.push('/vendor')
        }
    })

    const getRegions = useCallback(async () => {
        const regions = await fetchRegions()
        regions = regions.data.data
        setRegions(regions)
        formik.setFieldValue('region_id', regions[0].id)
        setRegion(regions[0])
        return regions[0].id
    }, [formik])

    const getDistricts = useCallback(async (id) => {
        setDistricts([])
        setDistrict(null)
        const districts = await fetchDistricts(id)
        districts = districts.data.data
        setDistricts(districts)
        formik.setFieldValue('district_id', districts[0].id)
        setDistrict(districts[0])
    }, [formik])

    useEffect(() => {
        let active = true

        if(!regionsLoading) {
            return undefined
        }

        const getOptions = async () => {
            const regionId = await getRegions()
            await getDistricts(regionId)
        }

        if (active) {
            getOptions()
        }
        return () => {
            active = false
        }
    }, [regionsLoading, getRegions, getDistricts])

    const handleRegionChange = async (e, value) => {
        setRegion(value)
        formik.setFieldValue('region_id', value?.id)
        await getDistricts(value.id)
    }

    const handleDistrictChange = (e, value) => {
        setDistrict(value)
        formik.setFieldValue('district_id', value?.id)
    }

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
                                        fieldError={formik.touched.region_id && Boolean(formik.errors.region_id)}
                                        fieldHelperText={formik.touched.region_id && formik.errors.region_id}
                                        handleBlur={formik.handleBlur}
                                        options={regions}
                                        option={region}
                                        loading={regionsLoading}
                                        handleChange={handleRegionChange}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <AutocompleteAsync
                                        formikKey='district_id'
                                        fieldLabel='District'
                                        fieldError={formik.touched.district_id && Boolean(formik.errors.district_id)}
                                        fieldHelperText={formik.touched.district_id && formik.errors.district_id}
                                        handleBlur={formik.handleBlur}
                                        options={districts}
                                        option={district}
                                        loading={districtsLoading}
                                        handleChange={handleDistrictChange}
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
                                        sx={{float: 'right'}}
                                        variant='contained'
                                        type='submit'
                                        endIcon={ isLoading
                                            &&
                                            <CircularProgress
                                                color='inherit'
                                                size={20}
                                            />
                                        }
                                        disabled={isLoading}
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