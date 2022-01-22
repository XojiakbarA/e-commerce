import { RadioGroup, FormControlLabel, Paper, Stack, Radio, Divider, FormControl, FormHelperText, Typography } from "@mui/material"

const PaymentForm = ({touched, errors, values, handleChange}) => {

    return (
        <Paper sx={{ padding: 3, marginBottom: 3 }}>
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
                <FormHelperText>{touched.pay_mode && errors.pay_mode}</FormHelperText>
            </FormControl>
        </Paper>
    )
}

export default PaymentForm