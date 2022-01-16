import { Button, IconButton, Typography, Card, CardActionArea, CardMedia, CardContent, Stack } from '@mui/material'
import NextLink from '../../common/Link'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { productImageURL } from '../../../utils/utils'
import { addToCart, deleteFromCart, removeFromCart } from '../../../redux/actions'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const SidebarProductCard = ({product}) => {

    const dispatch = useDispatch()

    const [ripple, setRipple] = useState(false)

    function handleActionEnter() {
        setRipple(true)
    }
    function handleActionLeave() {
        setRipple(false)
    }
    function handleDeleteCartClick(e) {
        e.preventDefault()
        dispatch(deleteFromCart(product.id))
    }
    function handleAddClick(e) {
        e.preventDefault()
        dispatch(addToCart(product.id))
    }
    function handleRemoveClick(e) {
        e.preventDefault()
        dispatch(removeFromCart(product.id))
    }

    return(
        <Card sx={{display: 'flex'}}>
            <CardActionArea disableRipple={ripple} component='div'>
                <NextLink href={'/products/' + product.id} style={{display: 'flex'}}>
                    <Stack
                        padding={1}
                        justifyContent='center'
                        alignItems='center'
                        onMouseEnter={ handleActionEnter }
                        onMouseLeave={ handleActionLeave }
                    >
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
                    <CardMedia
                        component='img'
                        image={product.image ? productImageURL + product.image.src : undefined}
                        sx={{width: 100}}
                    />
                    <CardContent>
                        <Typography variant='body1'>
                            {product.title}
                        </Typography>
                        <Typography variant='body2'>
                            $ {product.price}
                        </Typography>
                    </CardContent>
                    <Stack
                        marginLeft='auto'
                        alignSelf='flex-start'
                        onMouseEnter={ handleActionEnter }
                        onMouseLeave={ handleActionLeave }
                    >
                        <IconButton onClick={ handleDeleteCartClick }>
                            <CloseIcon fontSize='small' />
                        </IconButton>
                    </Stack>
                </NextLink>
            </CardActionArea>
        </Card>
    )
}

export default SidebarProductCard