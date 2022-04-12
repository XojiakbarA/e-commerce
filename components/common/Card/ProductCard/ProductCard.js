import {Card, CardContent, CardActionArea, Box} from '@mui/material'
import PhotoIcon from '@mui/icons-material/Photo'
import BaseLink from '../../Link/BaseLink'
import ThumbImage from '../../Image/ThumbImage'
import ProductCardButtons from './ProductCardButtons'
import ProductDetails from './ProductDetails'
import { productImageURL } from '../../../../utils/utils'

const ProductCard = ({product, listView}) => {

    const style = {
        list: {display: 'flex', justifyContent: 'flex-start'},
        card: {boxShadow: 3, borderRadius: 2, position: 'relative'},
        image: {position: 'relative', width: listView ? 150 : '100%', height: listView ? 150 : 276}
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
                    style={style.image}
                    variant='rounded'
                    noImageIcon={<PhotoIcon fontSize='large'/>}
                />
                <CardContent sx={{width: '100%'}}>
                    <Box display='flex'>
                        <ProductDetails product={product}/>
                        <ProductCardButtons
                            product={product}
                            display='flex'
                            flexDirection='column'
                            justifyContent='center'
                        />
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ProductCard