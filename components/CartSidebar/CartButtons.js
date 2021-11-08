import { Stack, Button } from "@mui/material"

const CartButtons = () => {
    return(
        <Stack
            spacing={2}
            alignItems='center'
            sx={{position: 'sticky', right: 0, bottom: 0, padding: 1, backgroundColor: 'white'}}
        >
            <Button variant='contained' fullWidth >Checkout Now</Button>
            <Button variant='outlined' fullWidth >View Cart</Button>
        </Stack>
    )
}

export default CartButtons