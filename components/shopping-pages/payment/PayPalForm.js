import { Stack, TextField, Button } from "@mui/material"

const PayPalForm = () => {
    return(
        <>
            <Stack direction='row' spacing={2}>
                <TextField size='small' label='PayPal Email' fullWidth />
                <Button variant='outlined'>Submit</Button>
            </Stack>
        </>
    )
}

export default PayPalForm