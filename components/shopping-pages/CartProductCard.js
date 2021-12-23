import { Button, IconButton, Typography, Card, CardActionArea, CardMedia, CardContent, Stack } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import NextLink from '../common/Link'
import { productImageURL } from '../../utils/utils'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, deleteFromCart, removeFromCart } from '../../redux/actions'

const CartProductCard = ({product}) => {

    const dispatch = useDispatch()

    const [ripple, setRipple] = useState(false)
    const id = product.id

    function handleActionEnter(e) {
        setRipple(true)
    }
    function handleActionLeave(e) {
        setRipple(false)
    }
    function handleDeleteCartClick(e) {
        e.preventDefault()
        dispatch(deleteFromCart(id))
    }
    function handleAddClick(e) {
        e.preventDefault()
        dispatch(addToCart(id))
    }
    function handleRemoveClick(e) {
        e.preventDefault()
        dispatch(removeFromCart(id))
    }

    return(
        <Card sx={{display: 'flex'}}>
            <CardActionArea disableRipple={ripple} component='div'>
                <NextLink href={`/products/${id}`} style={{display: 'flex', justifyContent: 'space-between', height: '100%'}}>
                <CardMedia
                    component='img'
                    image={productImageURL + product.image.src}
                    sx={{width: 120}}
                />
                <CardContent sx={{flex: 1}}>
                    <Typography variant='body1'>
                        {product.title}
                    </Typography>
                    <Typography variant='body2'>
                        $ {product.price}
                    </Typography>
                </CardContent>
                <Stack
                    justifyContent='space-between'
                    alignItems='flex-end'
                    padding={1}
                    onMouseEnter={ (e) => handleActionEnter(e) }
                    onMouseLeave={ (e) => handleActionLeave(e) }
                >
                    <IconButton onClick={ handleDeleteCartClick }>
                        <CloseIcon fontSize='small' />
                    </IconButton>
                    <Stack direction='row' spacing={1}>
                        <Button variant='outlined' sx={{padding: 0, minWidth: 0}} onClick={ handleAddClick }>
                            <AddIcon fontSize='small' />
                        </Button>
                        <Typography variant='body1'>
                            {product.quantity}
                        </Typography>
                        <Button variant='outlined' sx={{padding: 0, minWidth: 0, marginLeft: 0}} onClick={ handleRemoveClick }>
                            <RemoveIcon fontSize='small' />
                        </Button>
                    </Stack>
                </Stack>
                </NextLink>
            </CardActionArea>
        </Card>
    )
}

export default CartProductCard