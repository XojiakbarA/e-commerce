import { Button, IconButton, Typography, Card, CardActionArea, CardMedia, CardContent, Stack } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const CartProductCard = () => {
    return(
        <Card sx={{display: 'flex'}}>
            <CardActionArea sx={{display: 'flex', justifyContent: 'flex-start'}}>
                <CardMedia
                    component='img'
                    image='images/products/product1.png'
                    sx={{width: 120}}
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
            <Stack justifyContent='space-between' alignItems='flex-end' padding={1}>
                <IconButton>
                    <CloseIcon fontSize='small' />
                </IconButton>
                <Stack direction='row' spacing={1}>
                    <Button variant='outlined' sx={{padding: 0, minWidth: 0}}>
                        <AddIcon fontSize='small' />
                    </Button>
                    <Typography variant='body1'>
                        1
                    </Typography>
                    <Button variant='outlined' sx={{padding: 0, minWidth: 0, marginLeft: 0}}>
                        <RemoveIcon fontSize='small' />
                    </Button>
                </Stack>
            </Stack>
                
            
        </Card>
    )
}

export default CartProductCard