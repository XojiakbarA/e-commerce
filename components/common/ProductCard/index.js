import {Card, CardContent, CardMedia, CardActionArea, Typography, Rating, Stack, CircularProgress} from '@mui/material'
import { productImageURL } from '../../../utils/utils'
import NextLink from '../Link'
import Image from 'next/image'
import ProductCardButtons from './ProductCardButtons'
import { noImageUrl } from '../../../utils/utils'
import { useCart } from '../../../app/hooks/useCart'
import { useWishlist } from '../../../app/hooks/useWishlist'

const ProductCard = ({product, listView}) => {

    const style = {
        list: {display: 'flex', justifyContent: 'flex-start'},
        card: {boxShadow: 3, borderRadius: 2, position: 'relative'},
        cardMedia: {position: 'relative', width: listView ? 150 : '100%', height: listView ? 150 : 276}
    }

    const { productInCart, cartFetching, isClicked, addProductCart, deleteProductCart} = useCart(product.id)

    const { productInWishlist, wishlistFetching, isWishClicked, addProductWishlist, deleteProductWishlist } = useWishlist(product.id)

    const hasInCart = Boolean(productInCart)
    const hasInWishlist = Boolean(productInWishlist)

    return (
        <Card sx={style.card}>
            <CardActionArea>
                <NextLink
                    href={`/products/${product.id}`}
                    style={listView ? style.list : null}
                >
                    <CardMedia sx={style.cardMedia}>
                        <Image
                            src={product.image ? productImageURL + product.image.src : noImageUrl}
                            alt={product.image}
                            layout='fill'
                            objectFit='cover'
                        />
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
                id={product.id}
                hasInCart={hasInCart}
                cartFetching={cartFetching}
                isClicked={isClicked}
                addProductCart={addProductCart}
                deleteProductCart={deleteProductCart}
                hasInWishlist={hasInWishlist}
                wishlistFetching={wishlistFetching}
                isWishClicked={isWishClicked}
                addProductWishlist={addProductWishlist}
                deleteProductWishlist={deleteProductWishlist}
            />
            {
                cartFetching && isClicked || wishlistFetching && isWishClicked
                ?
                <CircularProgress
                    sx={{display: 'flex', flexDirection: 'column', position: 'absolute', top: 5, left: 5}}
                    size={20}
                />
                :
                null
            }
        </Card>
    );
}

export default ProductCard