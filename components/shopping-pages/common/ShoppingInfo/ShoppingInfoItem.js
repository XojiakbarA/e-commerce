import { Stack, Typography } from "@mui/material"

const ShoppingInfoItem = ({ prop }) => {
    return(
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant='body2'>
                {prop.name}
            </Typography>
            <Typography variant='h6'>
                { prop.value ? '$ '+prop.value : '-' }
            </Typography>
        </Stack>
    )
}

export default ShoppingInfoItem