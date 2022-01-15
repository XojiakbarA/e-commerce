import { Avatar, Card, Box, CardContent, CardMedia, Rating, Stack, Typography } from "@mui/material"
import { shopImageURL } from "../../utils/utils"

const ShopBigCard = ({shop}) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="200"
                image={shop.bg_image ? shopImageURL + shop.bg_image : undefined}
                alt={shop.bg_image}
                
            />
            <CardContent>
                <Stack direction='row' spacing={5}>
                    <Avatar
                        src={shop.av_image ? shopImageURL + shop.av_image : undefined}
                        alt={shop.av_image}
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