import { Grid, Paper, Typography, Stack, TextField, Autocomplete } from "@mui/material"
import { useState } from "react"

const countries = ['Kazakhstan', 'Uzbekistan', 'Tadjikistan', 'Kyrgizistan', 'Turkmenistan']

const CheckoutForm = ({formik}) => {

    const [country, setCountry] = useState(countries[1])

    return(
        <Paper sx={{ padding: 3, marginBottom: 3 }}>
            <Typography variant='body1' gutterBottom>
                Shipping Address
            </Typography>
                <Grid container spacing={2}>
                    <Grid item lg={6}>
                        <Stack spacing={2}>
                            <TextField
                                size='small'
                                label='Name'
                                error={ formik.touched.name && Boolean(formik.errors.name) }
                                helperText={ formik.touched.name && formik.errors.name }
                                { ...formik.getFieldProps('name') }
                            />
                            <TextField
                                size='small'
                                label='Phone Number'
                                error={ formik.touched.phone && Boolean(formik.errors.phone) }
                                helperText={ formik.touched.phone && formik.errors.phone }
                                { ...formik.getFieldProps('phone') }
                            />
                            <TextField
                                size='small'
                                label='Email address'
                                error={ formik.touched.email && Boolean(formik.errors.email) }
                                helperText={ formik.touched.email && formik.errors.email }
                                { ...formik.getFieldProps('email') }
                            />
                        </Stack>
                    </Grid>
                    <Grid item lg={6}>
                        <Stack spacing={2}>
                            <Autocomplete
                                size='small'
                                options={countries}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label='Country'
                                        error={ formik.touched.country && Boolean(formik.errors.country) }
                                        helperText={ formik.touched.country && formik.errors.country }
                                        name="country"
                                    />
                                )}
                                onBlur={formik.handleBlur}
                                value={country}
                                onChange={(e, newValue) => setCountry(newValue)}
                                inputValue={formik.values.country}
                                onInputChange={(e, newValue) => formik.setValues({ ...formik.values, country: newValue })}
                            />
                            <TextField
                                size='small'
                                label='Address'
                                error={ formik.touched.address && Boolean(formik.errors.address) }
                                helperText={ formik.touched.address && formik.errors.address }
                                { ...formik.getFieldProps('address') }
                            />
                            <TextField
                                size='small'
                                label='Zip Code'
                                error={ formik.touched.zip_code && Boolean(formik.errors.zip_code) }
                                helperText={ formik.touched.zip_code && formik.errors.zip_code }
                                { ...formik.getFieldProps('zip_code') }
                            />
                        </Stack>
                    </Grid>
                </Grid>
            
        </Paper>
    )
}

export default CheckoutForm