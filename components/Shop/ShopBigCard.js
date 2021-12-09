import { Avatar, Card, Box, CardContent, CardMedia, Rating, Stack, Typography } from "@mui/material"
import { shopImageURL } from "../../utils/utils"

const ShopBigCard = ({shop}) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="200"
                image={shopImageURL + shop.bg_image}
                alt={shop.title}
                
            />
            <CardContent>
                <Stack direction='row' spacing={5}>
                    <Avatar
                        src={shopImageURL + shop.av_image}
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
                            {shop.address}
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default ShopBigCard