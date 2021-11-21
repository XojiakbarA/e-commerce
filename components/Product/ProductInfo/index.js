import { Button, Rating, Stack, Typography } from "@mui/material"

const ProductInfo = ({product}) => {
    return(
        <Stack spacing={3} sx={{marginTop: 5}} alignItems='flex-start'>
            <Typography variant='h3'>
                {product.title}
            </Typography>
            <Typography variant='body1'>
                Category: <b>{product.sub_category.title}</b>
            </Typography>
            <Typography variant='body1'>
                Brand: <b>{product.brand.title}</b>
            </Typography>
            <Stack direction='row' spacing={2}>
                <Typography variant='body1'>
                    Rated:
                </Typography>
                <Rating name="read-only" value={product.rating} readOnly />
            </Stack>
            <Typography variant='h4' color='primary'>
                $ {product.price}
            </Typography>
            <Typography variant='body2'>
                {
                    product.avail ? 'Stock in available' : 'Unavailable'
                }
            </Typography>
            <Button variant='contained'>Add To Cart</Button>
            <Typography>
                Sold by: <b>{product.shop}</b>
            </Typography>
        </Stack>
    )
}

export default ProductInfo