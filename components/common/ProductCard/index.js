import {Card, CardContent, CardActionArea, Typography, Rating, Stack} from '@mui/material'
import PhotoIcon from '@mui/icons-material/Photo'
import { productImageURL } from '../../../utils/utils'
import BaseLink from '../Link/BaseLink'
import ProductCardButtons from './ProductCardButtons'
import ThumbImage from '../Image/ThumbImage'

const ProductCard = ({product, listView}) => {

    const style = {
        list: {display: 'flex', justifyContent: 'flex-start'},
        card: {boxShadow: 3, borderRadius: 2, position: 'relative'},
        cardMedia: {position: 'relative', width: listView ? 150 : '100%', height: listView ? 150 : 276}
    }

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
            <ProductCardButtons product={product}/>
        </Card>
    );
}

export default ProductCard