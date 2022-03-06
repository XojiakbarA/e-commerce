import {Card, CardActions, CardContent, CardMedia, Typography, Rating, IconButton, Avatar, Box, CardActionArea} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import BaseLink from '../common/Link/BaseLink'
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
        left: 0,
        top: 0,
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
        <Card>
            <CardActionArea
                href={`/shops/${shop.id}/products`}
                component={BaseLink}
                sx={styles.card}
            >
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
                        {
                            shop.av_image &&
                            <Image
                                src={shopImageURL + shop.av_image.src}
                                alt={shop.title}
                                layout='fill'
                                objectFit='cover'
                            />
                        }
                    </Avatar>
                </CardActions>
            </CardActionArea>
        </Card>
    );
}

export default ShopCard