import { Grid, Stack, TextField, Button } from "@mui/material"

const CreditCardForm = () => {
    return(
        <>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item lg={6}>
                    <Stack spacing={2}>
                        <TextField size='small' label='Card Number' />
                        <TextField size='small' label='Name on Card' />
                    </Stack>
                </Grid>
                <Grid item lg={6}>
                    <Stack spacing={2}>
                        <TextField size='small' label='Exp Date' />
                        <TextField size='small' label='Name on Card' />
                    </Stack>
                </Grid>
            </Grid>
            <Button variant='outlined' >Submit</Button>
        </>
    )
}

export default CreditCardForm