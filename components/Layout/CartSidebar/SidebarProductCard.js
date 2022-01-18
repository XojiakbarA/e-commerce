import { Button, IconButton, Typography, Card, CardActionArea, CardMedia, CardContent, Stack, Box } from '@mui/material'
import NextLink from '../../common/Link'
import Image from 'next/image'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { noImageUrl, productImageURL } from '../../../utils/utils'
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
                    <CardMedia>
                        <Box sx={{position: 'relative', width: 100, height: 100}}>
                            <Image
                                src={product.image ? productImageURL + product.image.src : noImageUrl}
                                alt={product.title}
                                layout='fill'
                                objectFit='cover'
                            />
                        </Box>
                    </CardMedia>
                    <CardContent>
                        <Typography
                            variant='body2'
                            noWrap
                            sx={{maxWidth: 150}}
                        >
                            {product.title}
                        </Typography>
                        <Stack direction='row' spacing={1}>
                            <Typography
                                variant='body2'
                                color={product.sale_price ? 'text.secondary' : 'text.primary'}
                                sx={{textDecoration: product.sale_price ? 'line-through' : 'none'}}
                            >
                                $ {product.price} {!product.sale_price && ` x ${product.quantity}`} 
                            </Typography>
                            {
                                product.sale_price &&
                                <Typography variant='body2'>
                                    $ {product.sale_price} x {product.quantity}
                                </Typography>
                            }
                        </Stack>
                    </CardContent>
                    <Stack
                        onMouseEnter={ handleActionEnter }
                        onMouseLeave={ handleActionLeave }
                        sx={{position: 'absolute', top: 0, right: 0}}
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