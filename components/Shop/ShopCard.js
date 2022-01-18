import {Card, CardActions, CardContent, CardMedia, Typography, Rating, IconButton, Avatar, Box} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import NextLink from '../common/Link'
import Image from 'next/image'
import { shopImageURL, noBgImageUrl, noAvImageUrl } from '../../utils/utils'

const styles = {
    card: {
        position: 'relative',
        height: 200
    },
    cardMedia: {
        position: 'absolute',
        zIndex: 0,
        top: 0,
        left: 0,
        width: '100%',
        height: 200
    },
    cardContent: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '100%',
        color: 'white',
        width: '100%'
    },
    cardActions: {
        position: 'absolute',
        zIndex: 2,
        bottom: 0
    }
}

const ShopCard = ({shop}) => {

    return (
        <Card sx={styles.card}>
            <CardMedia sx={styles.cardMedia}>
                <Box sx={{position: 'relative', width: '100%', height: '100%'}}>
                <Image
                    src={shop.bg_image_small ? shopImageURL + shop.bg_image_small.src : noBgImageUrl}
                    alt={shop.title}
                    layout='fill'
                    priority
                    objectFit='cover'
                />
                </Box>
            </CardMedia>
            <CardContent sx={styles.cardContent}>
                <Typography gutterBottom variant="h5" component="div">
                    {shop.title}
                </Typography>
                <Rating name="read-only" value={shop.rating} readOnly />
                <Typography variant="body2" color="whitesmoke">
                    {`${shop.region.name}, ${shop.district.name}, ${shop.street}, ${shop.home}`}
                </Typography>
            </CardContent>
            <CardActions sx={styles.cardActions}>
                <Avatar>
                    <Image
                        src={shop.av_image ? shopImageURL + shop.av_image.src : noAvImageUrl}
                        alt={shop.title}
                        layout='fill'
                    />
                </Avatar>
                <NextLink href={`/shops/${shop.id}/products`}>
                    <IconButton>
                            <ChevronRightIcon sx={{color: 'white'}} />
                    </IconButton>
                </NextLink>
            </CardActions>
        </Card>
    );
}

export default ShopCard