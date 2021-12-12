import { useState } from 'react'
import {Card, CardContent, CardMedia, CardActionArea, Box, Typography, IconButton, Tooltip, Rating} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { productImageURL } from '../../../utils/utils'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addToWishlist, deleteFromCart, deleteFromWishlist } from '../../../redux/actions'

const grid = {
    card: {boxShadow: 3, borderRadius: 2, position: 'relative'},
    cardActionArea: null,
    cardMedia: null
}

const list = {
    card: {boxShadow: 3, borderRadius: 2, display: 'flex', justifyContent: 'flex-start', position: 'relative'},
    cardActionArea: {display: 'flex', justifyContent: 'flex-start'},
    cardMedia: {width: 200, alignSelf: 'start'}
}

const ProductCard = ({product, view}) => {

    if (!product.image) {
        product.image = {id: null, src: 'no_image.jpeg'}
    }

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const wishlist = useSelector(state => state.wishlist)
    const findInCart = cart.find(item => item.id == product.id)
    const hasInCart = Boolean(findInCart)
    const findInWishlist = wishlist.find(item => item.id == product.id)
    const hasInWishlist = Boolean(findInWishlist)

    const [ripple, setRipple] = useState(false)
    const id = product.id

    function handleActionEnter(e) {
        setRipple(true)
    }
    function handleActionLeave(e) {
        setRipple(false)
    }
    function handleAddCartClick() {
        dispatch(addToCart(id))
    }
    function handleDeleteCartClick() {
        dispatch(deleteFromCart(id))
    }
    function handleAddWishlistClick() {
        dispatch(addToWishlist(id))
    }
    function handleDeleteWishlistClick() {
        dispatch(deleteFromWishlist(id))
    }

    return (
        <Card sx={ view == 'grid' || view == undefined ? grid.card : list.card }>
            <CardActionArea disableRipple={ripple}>
                <Link href={'/products/' + product.id}>
                <a style={ view == 'grid' || view == undefined ? grid.cardActionArea : list.cardActionArea }>
                    <CardMedia
                        component="img"
                        sx={ view == 'grid' || view == undefined ? grid.cardMedia : list.cardMedia }
                        image={productImageURL + product.image.src}
                        alt={product.title}
                    >
                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom
                            variant="h6"
                            component="div"
                            whiteSpace='nowrap'
                            textOverflow='ellipsis'
                            overflow='hidden'
                        >
                            {product.title}
                        </Typography>

                        <Rating value={product.rating} size='small' readOnly/>
                        
                        <Typography variant="h6" color="text.secondary">
                            $ {product.price}
                        </Typography>
                    </CardContent>
                </a>
                </Link>
            </CardActionArea>
            <Box
                sx={{display: 'flex', flexDirection: 'column', position: 'absolute', top: 0, right: 0}}
                onMouseEnter={ (e) => handleActionEnter(e) }
                onMouseLeave={ (e) => handleActionLeave(e) }
            >
                {
                    hasInWishlist
                    ?
                    <IconButton onClick={ handleDeleteWishlistClick }>
                        <Tooltip title='Remove from wishlist' placement='right' key={product.id}>
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
                        <Tooltip title='Remove from cart' placement='right' key={product.id}>
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
        </Card>
    );
}

export default ProductCard