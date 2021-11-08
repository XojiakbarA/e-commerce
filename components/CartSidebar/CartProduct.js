import { Box, Button, IconButton, Typography, Card, CardActionArea, CardMedia, CardContent, CardActions } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const CartProduct = () => {
    return(
        <Card sx={{display: 'flex'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 1}}>
                <Button variant='outlined' sx={{padding: 0, minWidth: 0}}>
                    <AddIcon fontSize='small' />
                </Button>
                <Typography variant='body1'>
                    1
                </Typography>
                <Button variant='outlined' sx={{padding: 0, minWidth: 0, marginLeft: 0}}>
                    <RemoveIcon fontSize='small' />
                </Button>
            </Box>
            <CardActionArea sx={{display: 'flex', justifyContent: 'flex-start'}}>
                <CardMedia
                    component='img'
                    image='images/products/product1.png'
                    sx={{width: 100}}
                />
                <CardContent>
                    <Typography variant='body1'>
                        Product 1
                    </Typography>
                    <Typography variant='body2'>
                        $ 400
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton>
                    <CloseIcon fontSize='small' />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default CartProduct