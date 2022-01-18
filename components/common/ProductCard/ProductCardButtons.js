import {Box, IconButton, Tooltip} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useCart } from '../../../app/hooks/useCart'
import { useWIshlist } from '../../../app/hooks/useWIshlist'

const ProductCardButtons = ({ id }) => {

    const { productInCart, addProductCart, deleteProductCart} = useCart(id)
    const { productInWishlist, addProductWishlist, deleteProductWishlist } = useWIshlist(id)

    const hasInCart = Boolean(productInCart)
    const hasInWishlist = Boolean(productInWishlist)

    return (
        <Box
            sx={{display: 'flex', flexDirection: 'column', position: 'absolute', top: 0, right: 0}}
        >
            {
                hasInWishlist
                ?
                <IconButton onClick={ deleteProductWishlist }>
                    <Tooltip title='Remove from wishlist' placement='right' key={id}>
                        <FavoriteIcon />
                    </Tooltip>
                </IconButton>
                :
                <IconButton onClick={ addProductWishlist }>
                    <Tooltip title='Add to wishlist' placement='right'>
                        <FavoriteBorderIcon />
                    </Tooltip>
                </IconButton>
            }
            {
                hasInCart
                ?
                <IconButton onClick={ deleteProductCart }>
                    <Tooltip title='Remove from cart' placement='right' key={id}>
                        <ShoppingCartIcon />
                    </Tooltip>
                </IconButton>
                :
                <IconButton onClick={ addProductCart }>
                    <Tooltip title='Add to cart' placement='right'>
                        <ShoppingCartOutlinedIcon />
                    </Tooltip>
                </IconButton>
            }
        </Box>
    )
}

export default ProductCardButtons