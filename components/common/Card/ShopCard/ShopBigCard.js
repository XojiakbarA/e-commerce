import { Avatar, Card, Box, CardContent, CardMedia, Rating, Stack, Typography } from "@mui/material"
import Image from 'next/image'
import { noBgImageUrl, appURL } from "../../../../utils/utils"

const ShopBigCard = ({shop}) => {
    return (
        <Card sx={{width: '100%'}}>
            <CardMedia sx={{width: '100%', height: 200}}>
                <Box sx={{position: 'relative', width: '100%', height: '100%'}}>
                    <Image
                        src={shop.bg_image_big ? appURL + shop.bg_image_big.src : noBgImageUrl}
                        alt={shop.title}
                        layout="fill"
                        priority
                        objectFit="cover"
                    />
                </Box>
            </CardMedia>
            <CardContent>
                <Stack direction='row' spacing={5} alignItems='center'>
                    <Avatar
                        src={shop.av_image ? appURL + shop.av_image.src : undefined}
                        alt={shop.title}
                        sx={{
                            width: 80,
                            height: 80,
                            border: 3,
                            borderColor: 'white'
                        }}
                    />
                    <Box>
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