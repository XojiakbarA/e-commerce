import { Button, Rating, Stack, Typography } from "@mui/material"

const ProductInfo = ({info}) => {
    return(
        <Stack spacing={3} sx={{marginTop: 5}} alignItems='flex-start'>
            <Typography variant='h3'>
                {info.title}
            </Typography>
            <Typography variant='body1'>
                Brand: <b>{info.brand}</b>
            </Typography>
            <Stack direction='row' spacing={2}>
                <Typography variant='body1'>
                    Rated:
                </Typography>
                <Rating name="read-only" value={info.rating} readOnly />
            </Stack>
            <Typography variant='h4' color='primary'>
                $ {info.price}
            </Typography>
            <Typography variant='body2'>
                {
                    info.availability ? 'Stock in available' : 'Unavailable'
                }
            </Typography>
            <Button variant='contained'>Add To Cart</Button>
            <Typography>
                Sold by: <b>{info.shop}</b>
            </Typography>
        </Stack>
    )
}

export default ProductInfo