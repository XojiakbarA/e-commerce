import { useState } from 'react'
import {Card, CardContent, CardMedia,
        CardActionArea, Box, Typography,
        IconButton, Tooltip, Rating} from '@mui/material'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { productImageURL } from '../../../utils/utils'
import Link from 'next/link'

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

    const [display, setDisplay] = useState('none')
    const [ripple, setRipple] = useState(false)

    function handleCardEnter(e) {
        setDisplay('flex')
    }
    function handleCardLeave(e) {
        setDisplay('none')
    }
    function handleActionEnter(e) {
        setRipple(true)
    }
    function handleActionLeave(e) {
        setRipple(false)
    }
    function handleWishlistClick(e) {
        
    }

    return (
        <Card
            sx={ view == 'grid' || view == undefined ? grid.card : list.card }
            onMouseEnter={ (e) => handleCardEnter(e) }
            onMouseLeave={ (e) => handleCardLeave(e) }
        >
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
                <IconButton onClick={ (e) => handleWishlistClick(e) }>
                    <Tooltip title='Add to wishlist' placement='right'>
                        <FavoriteBorderIcon />
                    </Tooltip>
                </IconButton>
                <IconButton>
                    <Tooltip title='Add to cart' placement='right'>
                        <ShoppingCartOutlinedIcon />
                    </Tooltip>
                </IconButton>
                <IconButton>
                    <Tooltip title='View' placement='right'>
                        <VisibilityOutlinedIcon />
                    </Tooltip>
                </IconButton>
            </Box>
        </Card>
    );
}

export default ProductCard