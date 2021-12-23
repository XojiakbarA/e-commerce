import { Stack, Typography } from "@mui/material"

const ShoppingInfoItem = ({ name, value, nameVariant }) => {
    return(
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant={nameVariant ?? 'body2'}>
                {name}
            </Typography>
            <Typography variant='h6'>
                { value ? '$ '+value : '-' }
            </Typography>
        </Stack>
    )
}

export default ShoppingInfoItem