import {Box, IconButton, Tooltip} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { addToCart, addToWishlist, deleteFromCart, deleteFromWishlist } from '../../../redux/actions'
import { useDispatch } from 'react-redux'

const ProductCardButtons = ({ hasInCart, hasInWishlist, id }) => {

    const dispatch = useDispatch()

    const handleAddCartClick = () => {
        dispatch(addToCart(id))
    }
    const handleDeleteCartClick = () => {
        dispatch(deleteFromCart(id))
    }
    const handleAddWishlistClick = () => {
        dispatch(addToWishlist(id))
    }
    const handleDeleteWishlistClick = () => {
        dispatch(deleteFromWishlist(id))
    }

    return (
        <Box
            sx={{display: 'flex', flexDirection: 'column', position: 'absolute', top: 0, right: 0}}
        >
            {
                hasInWishlist
                ?
                <IconButton onClick={ handleDeleteWishlistClick }>
                    <Tooltip title='Remove from wishlist' placement='right' key={id}>
                        <FavoriteIcon />
                    </Tooltip>
                </IconButton>
                :
                <IconButton onClick={ handleAddWishlistClick }>
                    <Tooltip title='Add to wishlist' placement='right'>
                        <FavoriteBorderIcon />
                    </Tooltip>
                </IconButton>
            }
            {
                hasInCart
                ?
                <IconButton onClick={ handleDeleteCartClick }>
                    <Tooltip title='Remove from cart' placement='right' key={id}>
                        <ShoppingCartIcon />
                    </Tooltip>
                </IconButton>
                :
                <IconButton onClick={ handleAddCartClick }>
                    <Tooltip title='Add to cart' placement='right'>
                        <ShoppingCartOutlinedIcon />
                    </Tooltip>
                </IconButton>
            }
        </Box>
    )
}

export default ProductCardButtons