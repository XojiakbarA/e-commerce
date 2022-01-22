import { Grid, Paper, Typography, TextField } from "@mui/material"
import AutocompleteAsync from "../common/AutocompleteAsync/AutocompleteAsync"
import PhoneMask from "../common/PhoneMask"

const CheckoutForm = ({
        getFieldProps, handleBlur,
        handleRegionChange, handleDistrictChange,
        touched, errors,
        regions, districts, region, district, isFetching
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
                            error={ touched.name && Boolean(errors.name) }
                            helperText={ touched.name && errors.name }
                            { ...getFieldProps('name') }
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
                    <Grid item lg={6}>
                        <TextField
                            size='small'
                            label='Email address'
                            fullWidth
                            error={ touched.email && Boolean(errors.email) }
                            helperText={ touched.email && errors.email }
                            { ...getFieldProps('email') }
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <Grid container spacing={2}>
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
                                    error={ touched.district_id && Boolean(errors.district_id)}
                                    helperText={ touched.district_id && errors.district_id}
                                    getOptionLabel={option => option.name}
                                    options={districts}
                                    option={district}
                                    handleChange={handleDistrictChange}
                                    handleBlur={handleBlur}
                                    loading={isFetching}
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
                        </Grid>
                    </Grid>
                </Grid>
            
        </Paper>
    )
}

export default CheckoutForm