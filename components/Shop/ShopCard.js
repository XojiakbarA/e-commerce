import {Card, CardActions, CardContent,
        CardMedia, Typography, Rating,
        IconButton, Avatar} from '@mui/material'

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ShopCard = ({shop}) => {
    return (
        <Card sx={{position: 'relative', height: 200}}>
            <CardMedia
                component="img"
                height="200"
                image={shop.background}
                alt={shop.title}
                sx={{position: 'absolute', zIndex: 0, top: 0, left: 0}}
            />
            <CardContent
                sx={{
                    position: 'absolute',
                    zIndex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    height: '100%',
                    color: 'white'
                }}
            >
                <Typography gutterBottom variant="h5" component="div">
                    {shop.title}
                </Typography>
                <Rating name="read-only" value={shop.rating} readOnly />
                <Typography variant="body2" color="whitesmoke">
                    {shop.address}
                </Typography>
            </CardContent>
            <CardActions sx={{position: 'absolute', zIndex: 2, bottom: 0}}>
                <IconButton>
                    <Avatar src={shop.avatar} alt={shop.title} />
                </IconButton>
                <IconButton>
                    <ChevronRightIcon sx={{color: 'white'}} />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default ShopCard