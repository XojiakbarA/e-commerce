import { Breadcrumbs, Button, Rating, Stack, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import NextLink from '../../common/Link'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../../redux/actions'

const ProductInfo = ({product}) => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const productInCart = cart.find(item => item.id == product.id)
    const hasInCart = Boolean(productInCart)

    function handleAddClick(e, id) {
        e.preventDefault()
        dispatch(addToCart(id))
    }
    function handleRemoveClick(e, id) {
        e.preventDefault()
        dispatch(removeFromCart(id))
    }

    return(
        <Stack spacing={3} sx={{marginTop: 5}} alignItems='flex-start'>
            <Typography variant='h3'>
                {product.title}
            </Typography>
            <Stack direction='row' spacing={1}>
                <Typography variant='body1'>
                    Category:
                </Typography>
                <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />}>
                    <NextLink href={'/search?cat_id=' + product.category.id}>
                        <b>{product.category.title}</b>
                    </NextLink>
                    <NextLink href={'/search?sub_cat_id=' + product.sub_category.id}>
                        <b>{product.sub_category.title}</b>
                    </NextLink>
                </Breadcrumbs>
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
            <Typography variant='h4' color='primary'>
                $ {product.price}
            </Typography>
            <Typography variant='body2'>
                {
                    product.avail ? 'Stock in available' : 'Unavailable'
                }
            </Typography>
            {
                hasInCart
                ?
                <Stack direction='row' spacing={2} alignItems='center'>
                    <Button variant='outlined' sx={{padding: 1, minWidth: 0}} onClick={ (e) => handleAddClick(e, product.id) }>
                        <AddIcon />
                    </Button>
                    <Typography variant='h6'>
                        {productInCart.quantity}
                    </Typography>
                    <Button variant='outlined' sx={{padding: 1, minWidth: 0}} onClick={ (e) => handleRemoveClick(e, product.id)}>
                        <RemoveIcon />
                    </Button>
                </Stack>
                :
                <Button variant='contained' onClick={ (e) => handleAddClick(e, product.id) }>Add To Cart</Button>
            }

            <Stack direction='row' spacing={2}>
                <Typography>
                    Sold by: <b>{!product.shop ? 'e-commerce' : null}</b>
                </Typography>
                {
                    product.shop
                    ?
                    <NextLink href={`/shops/${product.shop.id}/products`}>
                        <b>{product.shop.title}</b>
                    </NextLink>
                    :
                    null
                }
            </Stack>
        </Stack>
    )
}

export default ProductInfo