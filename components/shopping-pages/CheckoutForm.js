import { Grid, Paper, Typography, Stack, TextField } from "@mui/material"
import AutocompleteAsync from "../common/AutocompleteAsync/AutocompleteAsync"
import PhoneMask from "../common/PhoneMask"

const CheckoutForm = ({
    formik, loading,
    regions, region, handleRegionChange,
    districts, district, handleDistrictChange
}) => {

    return(
        <Paper sx={{ padding: 3, marginBottom: 3 }}>
            <Typography variant='body1' gutterBottom>
                Shipping Address
            </Typography>
                <Grid container spacing={2}>
                    <Grid item lg={6}>
                        <TextField
                            size='small'
                            label='Name'
                            fullWidth
                            error={ formik.touched.name && Boolean(formik.errors.name) }
                            helperText={ formik.touched.name && formik.errors.name }
                            { ...formik.getFieldProps('name') }
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
                    <Grid item lg={6}>
                        <TextField
                            size='small'
                            label='Email address'
                            fullWidth
                            error={ formik.touched.email && Boolean(formik.errors.email) }
                            helperText={ formik.touched.email && formik.errors.email }
                            { ...formik.getFieldProps('email') }
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <Grid container spacing={2}>
                            <Grid item lg={6}>
                                <AutocompleteAsync
                                    name='region_id'
                                    label='Region'
                                    error={formik.touched.region_id && Boolean(formik.errors.region_id)}
                                    helperText={formik.touched.region_id && formik.errors.region_id}
                                    getOptionLabel={option => option.name}
                                    options={regions}
                                    option={region}
                                    handleChange={handleRegionChange}
                                    handleBlur={formik.handleBlur}
                                />
                            </Grid>
                            <Grid item lg={6}>
                                <AutocompleteAsync
                                    name='district_id'
                                    label='District'
                                    error={ formik.touched.district_id && Boolean(formik.errors.district_id)}
                                    helperText={ formik.touched.district_id && formik.errors.district_id}
                                    getOptionLabel={option => option.name}
                                    options={districts}
                                    option={district}
                                    handleChange={handleDistrictChange}
                                    handleBlur={formik.handleBlur}
                                    loading={loading}
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
                        </Grid>
                    </Grid>
                </Grid>
            
        </Paper>
    )
}

export default CheckoutForm