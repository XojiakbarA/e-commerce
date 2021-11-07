import {Card, CardContent, CardMedia,
        CardActionArea, CardActions,
        Typography, IconButton, Tooltip} from '@mui/material'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import VisibilityIcon from '@mui/icons-material/Visibility'

const ProductCard = ({product}) => {

    return (
        <Card sx={{boxShadow: 3, borderRadius: 2}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={product.img}
                    alt={product.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        $ {product.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
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