import { Stack, Button, Paper, Typography, Box, TextField, Divider } from "@mui/material"

const CheckoutInfo = () => {
    return(
        <Paper sx={{padding: 3}}>
                    <Stack spacing={2} divider={<Divider orientation='horizontal' />}>
                        <Box>
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Typography variant='body2'>
                                    Subtotal:
                                </Typography>
                                <Typography variant='h6'>
                                    $ 2610
                                </Typography>
                            </Stack>
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Typography variant='body2'>
                                    Shipping:
                                </Typography>
                                <Typography variant='h6'>
                                    -
                                </Typography>
                            </Stack>
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Typography variant='body2'>
                                    Tax:
                                </Typography>
                                <Typography variant='h6'>
                                    $ 40
                                </Typography>
                            </Stack>
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Typography variant='body2'>
                                    Discount:
                                </Typography>
                                <Typography variant='h6'>
                                    -
                                </Typography>
                            </Stack>
                        </Box>
                        <Box>
                            <Typography variant='h5' gutterBottom textAlign='end'>
                                $ 2610
                            </Typography>
                            <Stack spacing={2}>
                                <TextField size='small' label='Voucher' />
                                <Button variant='outlined'>Apply Voucher</Button>
                            </Stack>
                        </Box>
                    </Stack>
                </Paper>
    )
}

export default CheckoutInfo