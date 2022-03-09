import { IconButton, Typography, Card, CardActionArea, CardContent, Stack, Box } from '@mui/material'
import BaseLink from '../../common/Link/BaseLink'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import PhotoIcon from '@mui/icons-material/Photo'
import { productImageURL } from '../../../utils/utils'
import { useRipple } from '../../../app/hooks/useRipple'
import { useCart } from '../../../app/hooks/useCart'
import ThumbImage from '../../common/Image/ThumbImage'

const SidebarProductCard = ({product}) => {

    const [ripple, events] = useRipple()

    const { removeProduct, incrementProduct, decrementProduct} = useCart(product)

    return(
        <Card>
            <CardActionArea
                disableRipple={ripple}
                component={BaseLink}
                href={`/products/${product.id}`}
                sx={{display: 'flex', justifyContent: 'flex-start'}}
            >
                <Stack
                    padding={1}
                    justifyContent='center'
                    alignItems='center'
                    { ...events }
                >
                    <IconButton
                        variant='outlined'
                        size='small'
                        color='primary'
                        onClick={ incrementProduct }
                    >
                        <AddIcon fontSize='small' />
                    </IconButton>
                    <Typography variant='body1'>
                        {product.quantity}
                    </Typography>
                    <IconButton
                        variant='outlined'
                        size='small'
                        onClick={ decrementProduct }
                    >
                        <RemoveIcon fontSize='small' />
                    </IconButton>
                </Stack>
                <ThumbImage
                    url={productImageURL}
                    src={product.image}
                    size={100}
                    variant='rounded'
                    noImageIcon={<PhotoIcon fontSize='large'/>}
                />
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
                <Box
                    sx={{position: 'absolute', top: 0, right: 0}}
                    { ...events }
                >
                    <IconButton size='small' onClick={ removeProduct }>
                        <CloseIcon fontSize='small' />
                    </IconButton>
                </Box>
            </CardActionArea>
        </Card>
    )
}

export default SidebarProductCard