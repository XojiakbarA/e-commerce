import { Stack, TextField, Button } from "@mui/material"
import { useRouter } from "next/router"

const VoucherForm = () => {

    const router = useRouter()

    return(
        <Stack spacing={2} display={router.asPath == '/payment' ? 'none' : 'flex'} marginTop={2}>
            <TextField size='small' label='Voucher' />
            <Button variant='outlined' >Apply Voucher</Button>
        </Stack>
    )
}

export default VoucherForm