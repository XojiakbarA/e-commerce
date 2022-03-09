import { Breadcrumbs, Button, CircularProgress, IconButton, Rating, Stack, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import BaseLink from '../../common/Link/BaseLink'
import { useRouter } from 'next/router'
import { useCart } from '../../../app/hooks/useCart'
import { useWishlist } from '../../../app/hooks/useWishlist'

const ProductInfo = ({product}) => {

    const router = useRouter()

    const { productInCart, addProduct, incrementProduct, decrementProduct} = useCart(product)

    const { wishlistFetching, isWishClicked, productInWishlist, addProductWishlist, deleteProductWishlist } = useWishlist(product.id)

    const hasInCart = Boolean(productInCart)
    const hasInWishlist = Boolean(productInWishlist)
    

    const isProductsPage = router.pathname.indexOf('/products') === 0

    return(
        <Stack spacing={3} sx={{marginTop: 5, paddingTop: 2, position: 'relative'}} alignItems='flex-start'>
            {
                isProductsPage
                ?
                    <Stack direction='row' spacing={2} sx={{position: 'absolute', top: 0, right: 0}} alignItems='center'>
                        {
                            wishlistFetching && isWishClicked &&
                            <CircularProgress size={25}/>
                        }
                        {
                            hasInWishlist
                            ?
                            <IconButton
                                size='large'
                                disabled={wishlistFetching && isWishClicked}
                                onClick={ e => deleteProductWishlist(e, product.id) }
                            >
                                <FavoriteIcon fontSize='large'/>
                            </IconButton>
                            :
                            <IconButton
                                size='large'
                                disabled={wishlistFetching && isWishClicked}
                                onClick={ e => addProductWishlist(e, product.id) }
                            >
                                <FavoriteBorderIcon fontSize='large'/>
                            </IconButton>
                        }
                    </Stack>
                :
                null
            }
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
                        <BaseLink
                            href={`/search?cat_id=${product.category.id}`}
                            underline='hover'
                            fontWeight='bold'
                        >
                            {product.category.title}
                        </BaseLink>
                        <BaseLink
                            href={`/search?sub_cat_id=${product.sub_category.id}`}
                            underline='hover'
                            fontWeight='bold'
                        >
                            {product.sub_category.title}
                        </BaseLink>
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
                { product.stock ? 'Stock in available' : 'Unavailable' }
            </Typography>
            {
                isProductsPage
                ?
                    hasInCart
                    ?
                    <Stack direction='row' spacing={2} alignItems='center'>
                        <IconButton
                            variant='outlined'
                            size='small'
                            color='primary'
                            onClick={ incrementProduct }
                        >
                            <AddIcon fontSize='large'/>
                        </IconButton>
                        <Typography variant='h6'>
                            {productInCart.quantity}
                        </Typography>
                        <IconButton
                            variant='outlined'
                            size='small'
                            onClick={ decrementProduct }
                        >
                            <RemoveIcon fontSize='large'/>
                        </IconButton>                     
                    </Stack>
                    :
                    <Button
                        variant='contained'
                        onClick={ addProduct }
                        endIcon={<AddShoppingCartIcon/>}
                    >
                        Add To Cart
                    </Button>
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
                    <BaseLink
                        href={`/shops/${product.shop.id}/products`}
                        underline='hover'
                        fontWeight='bold'
                    >
                        {product.shop.title}
                    </BaseLink>
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