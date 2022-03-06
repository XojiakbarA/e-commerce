import { Grid, Paper, Typography, TextField, RadioGroup, FormControlLabel, Stack, Radio, Divider, FormControl, FormHelperText, Button, CircularProgress } from "@mui/material"
import { useRouter } from "next/router"
import { useCheckout } from "../../app/hooks/useFormik/useCheckout"
import { useLocation } from "../../app/hooks/useLocation"
import AutocompleteAsync from "../common/AutocompleteAsync/AutocompleteAsync"
import PhoneMask from "../common/PhoneMask"
import BaseLink from '../common/Link/BaseLink'

const radios = [
    {value: 'uzcard', label: 'Pay with UzCard'},
    {value: 'click', label: 'Pay with Click'},
    {value: 'payme', label: 'Pay with Payme'},
    {value: 'cod', label: 'Cash on Delivery'}
]

const CheckoutForm = () => {

    const router = useRouter()

    const {
        handleSubmit, getFieldProps, handleBlur, handleChange, setFieldValue,
        touched, errors, values, isSubmitting,
    } = useCheckout()

    const {
        regions, region, districts, district, isFetching,
        handleRegionChange, handleDistrictChange,
    } = useLocation(setFieldValue)

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper sx={{ padding: 3 }}>
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
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ padding: 3 }}>
                        <Typography
                            variant='body1'
                            color={touched.pay_mode && Boolean(errors.pay_mode) ? '#d32f2f' : 'inherit'}
                            gutterBottom
                        >
                            Payment Mode
                        </Typography>
                        <FormControl
                            fullWidth error={ touched.pay_mode && Boolean(errors.pay_mode) }>
                            <RadioGroup
                                value={values.pay_mode}
                                onChange={handleChange}
                                row
                            >
                                <Stack spacing={2} direction='row' divider={<Divider orientation='vertical'/>}>
                                    {
                                        radios.map(({value, label}, i) => (
                                            <FormControlLabel
                                                key={i}
                                                value={value}
                                                label={label}
                                                control={<Radio />}
                                                name='pay_mode'
                                            />
                                        ))
                                    }
                                </Stack>
                            </RadioGroup>
                            <FormHelperText>{touched.pay_mode && errors.pay_mode}</FormHelperText>
                        </FormControl>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction='row' spacing={4} justifyContent='center'>
                        <Button
                            fullWidth
                            variant='outlined'
                            href='/cart'
                            component={BaseLink}
                        >
                            Back to Cart
                        </Button>
                        <Button
                            variant='contained'
                            fullWidth
                            type='submit'
                            endIcon={
                                isSubmitting &&
                                <CircularProgress
                                    color='inherit'
                                    size={20}
                                    sx={{position: 'absolute', top: '25%', right: 10}}
                                />
                            }
                            disabled={isSubmitting}
                        >
                            Order
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    )
}

export default CheckoutForm