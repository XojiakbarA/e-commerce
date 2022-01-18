import { Avatar, Card, Box, CardContent, CardMedia, Rating, Stack, Typography } from "@mui/material"
import Image from 'next/image'
import { shopImageURL, noBgImageUrl } from "../../utils/utils"

const ShopBigCard = ({shop}) => {
    return (
        <Card sx={{position: 'relative', width: '100%', height: 330}}>
            <CardMedia
                sx={{position: 'absolute', top: 0, left: 0, zIndex: 0, width: '100%', height: 330}}
            >
                <Box sx={{position: 'relative', width: '100%', height: '100%'}}>
                    <Image
                        src={shop.bg_image_big ? shopImageURL + shop.bg_image_big.src : noBgImageUrl}
                        alt={shop.title}
                        layout="fill"
                        priority
                        objectFit="cover"
                    />
                </Box>
            </CardMedia>
            <CardContent sx={{zIndex: 1, position: 'absolute', bottom: 0, left: 0, backgroundColor: 'white', width: '100%'}}>
                <Stack direction='row' spacing={5}>
                    <Avatar
                        src={shop.av_image ? shopImageURL + shop.av_image.src : undefined}
                        alt={shop.title}
                        sx={{
                            width: 80,
                            height: 80,
                            border: 3,
                            borderColor: 'white'
                        }}
                    />
                    <Box sx={{zIndex: 1}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {shop.title}
                        </Typography>
                        <Rating name="read-only" value={shop.rating} readOnly />
                        <Typography variant="body2">
                            {`${shop.region.name}, ${shop.district.name}, ${shop.street}, ${shop.home}`}
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default ShopBigCard