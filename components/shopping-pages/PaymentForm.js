import { RadioGroup, FormControlLabel, Paper, Stack, Radio, Divider, FormControl, FormHelperText, Typography } from "@mui/material"

const PaymentForm = ({formik}) => {

    return (
        <Paper sx={{ padding: 3, marginBottom: 3 }}>
            <Typography variant='body1' gutterBottom>
                Payment Mode
            </Typography>
            <FormControl fullWidth error={ formik.touched.pay_mode && Boolean(formik.errors.pay_mode) }>
                <RadioGroup
                    value={formik.values.pay_mode}
                    onChange={formik.handleChange}
                    row
                >
                    <Stack spacing={2} direction='row' divider={<Divider orientation='vertical'/>}>
                        <FormControlLabel
                            value='uzcard'
                            label='Pay with UzCard'
                            control={<Radio />}
                            name='pay_mode'
                            
                        />
                        <FormControlLabel
                            value='click'
                            label='Pay with Click'
                            control={<Radio />}
                            name='pay_mode'
                        />
                        <FormControlLabel
                            value='payme'
                            label='Pay with Payme'
                            control={<Radio />}
                            name='pay_mode'
                        />
                        <FormControlLabel
                            value='cod'
                            label='Cash on Delivery'
                            control={<Radio />}
                            name='pay_mode'
                        />
                    </Stack>
                </RadioGroup>
                <FormHelperText>{formik.touched.pay_mode && formik.errors.pay_mode}</FormHelperText>
            </FormControl>
        </Paper>
    )
}

export default PaymentForm