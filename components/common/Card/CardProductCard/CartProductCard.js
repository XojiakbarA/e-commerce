import { IconButton, Typography, Card, CardActionArea, CardContent, Stack } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import PhotoIcon from '@mui/icons-material/Photo'
import BaseLink from '../../Link/BaseLink'
import ThumbImage from '../../Image/ThumbImage'
import { useCart } from '../../../../app/hooks/useCart'

const CartProductCard = ({product}) => {

    const { removeProduct, incrementProduct, decrementProduct } = useCart(product)

    return(
        <Card sx={{position: 'relative'}}>
            <CardActionArea
                component={BaseLink}
                href={`/products/${product.id}`}
                sx={{display: 'flex', justifyContent: 'space-between', height: '100%'}}
            >
                <ThumbImage
                    src={product.main_image}
                    size={120}
                    variant='rounded'
                    noImageIcon={<PhotoIcon fontSize='large'/>}
                />
                <CardContent sx={{flex: 1}}>
                    <Typography variant='body1'>
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
            </CardActionArea>
            <Stack
                justifyContent='space-between'
                alignItems='flex-end'
                padding={1}
                sx={{position: 'absolute', top: 0, right: 0, height: '100%'}}
            >
                <IconButton onClick={ removeProduct }>
                    <CloseIcon fontSize='small' />
                </IconButton>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <IconButton
                        variant='outlined'
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
                        onClick={ decrementProduct }
                    >
                        <RemoveIcon fontSize='small' />
                    </IconButton>
                </Stack>
            </Stack>
        </Card>
    )
}

export default CartProductCard