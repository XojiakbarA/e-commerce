import {Box, IconButton, Tooltip} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useCart } from '../../../app/hooks/useCart'

const ProductCardButtons = ({
    product,
    hasInWishlist, wishlistFetching, isWishClicked, addProductWishlist, deleteProductWishlist
}) => {

    const { productInCart, addProduct, removeProduct} = useCart(product)

    const hasInCart = Boolean(productInCart)

    return (
        <Box
            sx={{display: 'flex', flexDirection: 'column', position: 'absolute', top: 0, right: 0}}
        >
            {
                hasInWishlist
                ?
                <IconButton onClick={ e => deleteProductWishlist(e, id) } disabled={wishlistFetching && isWishClicked}>
                    <Tooltip title='Remove from wishlist' placement='right' key={product.id}>
                        <FavoriteIcon />
                    </Tooltip>
                </IconButton>
                :
                <IconButton onClick={ e => addProductWishlist(e, id) } disabled={wishlistFetching && isWishClicked}>
                    <Tooltip title='Add to wishlist' placement='right'>
                        <FavoriteBorderIcon />
                    </Tooltip>
                </IconButton>
            }
            {
                hasInCart
                ?
                <IconButton onClick={ removeProduct }>
                    <Tooltip title='Remove from cart' placement='right' key={product.id}>
                        <ShoppingCartIcon />
                    </Tooltip>
                </IconButton>
                :
                <IconButton onClick={ addProduct }>
                    <Tooltip title='Add to cart' placement='right'>
                        <ShoppingCartOutlinedIcon />
                    </Tooltip>
                </IconButton>
            }
        </Box>
    )
}

export default ProductCardButtons