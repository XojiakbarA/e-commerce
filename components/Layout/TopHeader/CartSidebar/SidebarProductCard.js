import { Button, IconButton, Typography, Card, CardActionArea, CardMedia, CardContent, Stack } from '@mui/material'
import Link from 'next/link'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { productImageURL } from '../../../../utils/utils'
import { addToCart, deleteFromCart, removeFromCart } from '../../../../redux/actions/thunk'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const SidebarProductCard = ({product}) => {

    const dispatch = useDispatch()

    const [ripple, setRipple] = useState(false)

    function handleActionEnter(e) {
        setRipple(true)
    }
    function handleActionLeave(e) {
        setRipple(false)
    }
    function handleDeleteCartClick(e, id) {
        dispatch(deleteFromCart(id))
    }
    function handleAddClick(e, id) {
        dispatch(addToCart(id))
    }
    function handleRemoveClick(e, id) {
        dispatch(removeFromCart(id))
    }

    return(
        <Card sx={{display: 'flex'}}>
            <CardActionArea disableRipple={ripple}>
                <Link href={'/products/' + product.id}>
                <a style={{display: 'flex', justifyContent: 'flex-start'}}>
                    <Stack
                        padding={1}
                        justifyContent='center'
                        alignItems='center'
                        onMouseEnter={ (e) => handleActionEnter(e) }
                        onMouseLeave={ (e) => handleActionLeave(e) }
                    >
                        <Button variant='outlined' sx={{padding: 0, minWidth: 0}} onClick={ (e) => handleAddClick(e, product.id) }>
                            <AddIcon fontSize='small' />
                        </Button>
                        <Typography variant='body1'>
                            {product.quantity}
                        </Typography>
                        <Button disabled={product.quantity == 1} variant='outlined' sx={{padding: 0, minWidth: 0, marginLeft: 0}} onClick={ (e) => handleRemoveClick(e, product.id) }>
                            <RemoveIcon fontSize='small' />
                        </Button>
                    </Stack>
                    <CardMedia
                        component='img'
                        image={productImageURL + product.image.src}
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
                        alignSelf='flex-start'
                        onMouseEnter={ (e) => handleActionEnter(e) }
                        onMouseLeave={ (e) => handleActionLeave(e) }
                    >
                        <IconButton onClick={ (e) => handleDeleteCartClick(e, product.id) }>
                            <CloseIcon fontSize='small' />
                        </IconButton>
                    </Stack>
                </a>
                </Link>
            </CardActionArea>
        </Card>
    )
}

export default SidebarProductCard