import {Card, CardContent, CardMedia, CardActionArea, Typography, Rating, Stack} from '@mui/material'
import PhotoIcon from '@mui/icons-material/Photo'
import { productImageURL } from '../../../utils/utils'
import BaseLink from '../Link/BaseLink'
import Image from 'next/image'
import ProductCardButtons from './ProductCardButtons'
import { noImageUrl } from '../../../utils/utils'
import { useWishlist } from '../../../app/hooks/useWishlist'
import ThumbImage from '../Image/ThumbImage'

const ProductCard = ({product, listView}) => {

    const style = {
        list: {display: 'flex', justifyContent: 'flex-start'},
        card: {boxShadow: 3, borderRadius: 2, position: 'relative'},
        cardMedia: {position: 'relative', width: listView ? 150 : '100%', height: listView ? 150 : 276}
    }

    const { productInWishlist, wishlistFetching, isWishClicked, addProductWishlist, deleteProductWishlist } = useWishlist(product.id)

    const hasInWishlist = Boolean(productInWishlist)

    return (
        <Card sx={style.card}>
            <CardActionArea
                sx={listView ? style.list : null}
                href={`/products/${product.id}`}
                component={BaseLink}
            >
                <ThumbImage
                    url={productImageURL}
                    src={product.image}
                    style={style.cardMedia}
                    variant='rounded'
                    noImageIcon={<PhotoIcon fontSize='large'/>}
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
                                $ {product.sale_price}
                            </Typography>
                        }
                    </Stack>
                </CardContent>
            </CardActionArea>
            <ProductCardButtons
                product={product}
                hasInWishlist={hasInWishlist}
                wishlistFetching={wishlistFetching}
                isWishClicked={isWishClicked}
                addProductWishlist={addProductWishlist}
                deleteProductWishlist={deleteProductWishlist}
            />
        </Card>
    );
}

export default ProductCard