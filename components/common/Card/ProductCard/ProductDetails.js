import {Typography, Rating, Stack, Box} from '@mui/material'

const ProductDetails = ({ product }) => {

    return (
        <Box flex={'1 1 0'} minWidth={0}>
            <Typography gutterBottom
                fontSize='medium'
                variant="subtitle2"
                component="div"
                whiteSpace='nowrap'
                textOverflow='ellipsis'
                overflow='hidden'
            >
                {product.title}
            </Typography>

            <Rating value={product.rating} size='small' readOnly/>
    
            <Stack direction='row' spacing={2}>
                <Typography
                    fontSize='large'
                    variant='button'
                    color={product.sale_price ? 'text.secondary' : 'primary'}
                    sx={{textDecoration: product.sale_price ? 'line-through' : 'none'}}
                >
                    $ {product.price}
                </Typography>
                {
                    product.sale_price &&
                    <Typography
                        fontSize='large'
                        variant='button'
                        color='primary'
                    >
                        $ {product.sale_price}
                    </Typography>
                }
            </Stack>
        </Box>
    )
}

export default ProductDetails