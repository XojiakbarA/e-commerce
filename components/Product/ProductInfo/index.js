import { Breadcrumbs, Button, Rating, Stack, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import NextLink from '../../common/Link'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useCart } from '../../../app/hooks/useCart'

const ProductInfo = ({product}) => {

    const router = useRouter()
    const cart = useSelector(state => state.cart.data)
    const [addProductCart, removeProductCart] = useCart(product.id)

    const productInCart = cart.find(item => item.id == product.id)
    const hasInCart = Boolean(productInCart)
    const isProductsPage = router.pathname.indexOf('/products') === 0

    return(
        <Stack spacing={3} sx={{marginTop: 5}} alignItems='flex-start'>
            <Typography variant='h3'>
                {product.title}
            </Typography>
            <Stack direction='row' spacing={1}>
                <Typography variant='body1'>
                    Category:
                </Typography>
                {
                    isProductsPage
                    ?
                    <Breadcrumbs separator={<NavigateNextIcon fontSize='small'/>}>
                        <NextLink href={'/search?cat_id=' + product.category.id}>
                            <Typography fontWeight='bold' color='text.primary'>
                                {product.category.title}
                            </Typography>
                        </NextLink>
                        <NextLink href={'/search?sub_cat_id=' + product.sub_category.id}>
                            <Typography fontWeight='bold' color='text.primary'>
                                {product.sub_category.title}
                            </Typography>
                        </NextLink>
                    </Breadcrumbs>
                    :
                    <Breadcrumbs separator={<NavigateNextIcon fontSize='small'/>}>
                        <Typography fontWeight='bold' color='text.primary'>
                            {product.category.title}
                        </Typography>
                        <Typography fontWeight='bold' color='text.primary'>
                            {product.sub_category.title}
                        </Typography>
                    </Breadcrumbs>
                }
            </Stack>
            <Typography variant='body1'>
                Brand: <b>{product.brand.title}</b>
            </Typography>
            <Stack direction='row' spacing={2}>
                <Typography variant='body1'>
                    Rated:
                </Typography>
                <Rating name="read-only" value={product.rating} readOnly />
            </Stack>
            <Stack direction='row' spacing={2}>
                <Typography
                    variant='h4'
                    color={product.sale_price ? 'gray' : 'primary'}
                    sx={{textDecoration: product.sale_price ? 'line-through' : 'none'}}
                >
                    $ {product.price}
                </Typography>
                {
                    product.sale_price
                    &&
                    <Typography variant='h4' color='primary'>
                        $ {product.sale_price}
                    </Typography>
                }
            </Stack>
            <Typography variant='body2'>
                {
                    product.stock ? 'Stock in available' : 'Unavailable'
                }
            </Typography>
            {
                isProductsPage
                ?
                    hasInCart
                    ?
                    <Stack direction='row' spacing={2} alignItems='center'>
                        <Button
                            variant='outlined'
                            sx={{padding: 1, minWidth: 0}}
                            onClick={ addProductCart }
                        >
                            <AddIcon />
                        </Button>
                        <Typography variant='h6'>
                            {productInCart.quantity}
                        </Typography>
                        <Button
                            variant='outlined'
                            sx={{padding: 1, minWidth: 0, marginLeft: 0}}
                            onClick={ removeProductCart }
                        >
                            <RemoveIcon />
                        </Button>
                    </Stack>
                    :
                    <Button variant='contained' onClick={ addProductCart }>Add To Cart</Button>
                :
                null
            }
            <Stack direction='row' spacing={2}>
                <Typography>
                    Sold by:
                </Typography>
                {
                    isProductsPage
                    ?
                    <NextLink href={`/shops/${product.shop.id}/products`}>
                        <Typography fontWeight='bold' color='text.primary'>
                            {product.shop.title}
                        </Typography>
                    </NextLink>
                    :
                    <Typography fontWeight='bold' color='text.primary'>
                        {product.shop.title}
                    </Typography>
                }
            </Stack>
        </Stack>
    )
}

export default ProductInfo