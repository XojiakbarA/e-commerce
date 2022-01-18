import { Button, IconButton, Typography, Card, CardActionArea, CardMedia, CardContent, Stack } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Image from 'next/image'
import NextLink from '../common/Link'
import { noImageUrl, productImageURL } from '../../utils/utils'
import { useCart } from '../../app/hooks/useCart'

const CartProductCard = ({product}) => {

    const [addProductCart, removeProductCart, deleteProductCart] = useCart(product.id)

    return(
        <Card sx={{display: 'flex', position: 'relative'}}>
            <CardActionArea component='div'>
                <NextLink href={`/products/${product.id}`} style={{display: 'flex', justifyContent: 'space-between', height: '100%'}}>
                <CardMedia sx={{width: 120, height: 120, position: 'relative'}}>
                    <Image
                        src={product.image ? productImageURL + product.image.src : noImageUrl}
                        alt={product.title}
                        layout='fill'
                        objectFit='cover'
                    />
                </CardMedia>
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
                
                </NextLink>
            </CardActionArea>
            <Stack
                justifyContent='space-between'
                alignItems='flex-end'
                padding={1}
                sx={{position: 'absolute', top: 0, right: 0, height: '100%'}}
            >
                <IconButton onClick={ deleteProductCart }>
                    <CloseIcon fontSize='small' />
                </IconButton>
                <Stack direction='row' spacing={1}>
                    <Button
                        variant='outlined'
                        sx={{padding: 0, minWidth: 0}}
                        onClick={ addProductCart }
                    >
                        <AddIcon fontSize='small' />
                    </Button>
                    <Typography variant='body1'>
                        {product.quantity}
                    </Typography>
                    <Button
                        variant='outlined'
                        sx={{padding: 0, minWidth: 0, marginLeft: 0}}
                        onClick={ removeProductCart }
                    >
                        <RemoveIcon fontSize='small' />
                    </Button>
                </Stack>
            </Stack>
        </Card>
    )
}

export default CartProductCard