import { useState } from 'react'
import {Card, CardContent, CardMedia, CardActionArea, Typography, Rating, Stack} from '@mui/material'
import { productImageURL } from '../../../utils/utils'
import NextLink from '../Link'
import { useSelector } from 'react-redux'
import ProductCardButtons from './ProductCardButtons'

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

    const cart = useSelector(state => state.cart.data) ?? []
    const wishlist = useSelector(state => state.wishlist)
    const hasInCart = Boolean(cart.find(item => item.id == product.id))
    const hasInWishlist = Boolean(wishlist.find(item => item.id == product.id))

    const [ripple, setRipple] = useState(false)

    function handleEnter() {
        setRipple(true)
    }
    function handleLeave() {
        setRipple(false)
    }

    return (
        <Card sx={ view == 'grid' || view == undefined ? grid.card : list.card }>
            <CardActionArea disableRipple={ripple}>
                <NextLink
                    href={`/products/${product.id}`}
                    style={view == 'grid' || view == undefined ? grid.cardActionArea : list.cardActionArea}
                >
                    <CardMedia
                        component="img"
                        image={productImageURL + (product.image?.src ?? 'no_image.jpeg')}
                        sx={ view == 'grid' || view == undefined ? grid.cardMedia : list.cardMedia }
                        alt={product.title}
                    />
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
                        
                        <Stack direction='row' spacing={2}>
                            <Typography
                                variant="h6"
                                color={product.sale_price ? 'text.secondary' : 'text.primary'}
                                sx={{textDecoration: product.sale_price ? 'line-through' : 'none'}}
                            >
                                $ {product.price}
                            </Typography>
                            {
                                product.sale_price &&
                                <Typography variant="h6" color="text.primary">
                                    $ {product.price}
                                </Typography>
                            }
                        </Stack>
                    </CardContent>
                </NextLink>
            </CardActionArea>
            <ProductCardButtons
                hasInCart={hasInCart}
                hasInWishlist={hasInWishlist}
                handleEnter={handleEnter}
                handleLeave={handleLeave}
                id={product.id}
            />
        </Card>
    );
}

export default ProductCard