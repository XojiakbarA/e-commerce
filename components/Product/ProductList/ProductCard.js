import {Card, CardContent, CardMedia,
        CardActionArea, CardActions,
        Typography, IconButton, Tooltip, Rating} from '@mui/material'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import VisibilityIcon from '@mui/icons-material/Visibility'

const grid = {
    card: {boxShadow: 3, borderRadius: 2},
    cardActionArea: null,
    cardMedia: null,
    cardActions: null
}

const list = {
    card: {boxShadow: 3, borderRadius: 2, display: 'flex', justifyContent: 'flex-start'},
    cardActionArea: {display: 'flex', justifyContent: 'flex-start'},
    cardMedia: {width: 200},
    cardActions: {display: 'flex', flexDirection: 'column', alignItems: 'center'}
}

const ProductCard = ({product, view}) => {

    return (
        <Card sx={ view == 'grid' || view == undefined ? grid.card : list.card }>
            <CardActionArea sx={ view == 'grid' || view == undefined ? grid.cardActionArea : list.cardActionArea }>
                <CardMedia
                    component="img"
                    sx={ view == 'grid' || view == undefined ? grid.cardMedia : list.cardMedia }
                    image={product.img}
                    alt={product.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                    </Typography>

                    <Rating value={product.rating} size='small' readOnly/>
                    
                    <Typography variant="h6" color="text.secondary">
                        $ {product.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={ view == 'grid' || view == undefined ? grid.cardActions : list.cardActions }>
                <IconButton>
                    <Tooltip title='Add to wishlist'>
                        <FavoriteBorderIcon />
                    </Tooltip>
                </IconButton>
                <IconButton>
                    <Tooltip title='Add to cart'>
                        <ShoppingCartOutlinedIcon />
                    </Tooltip>
                </IconButton>
                <IconButton>
                    <Tooltip title='View'>
                        <VisibilityOutlinedIcon />
                    </Tooltip>
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default ProductCard