import { Button, IconButton, Typography, Card, CardActionArea, CardMedia, CardContent, Stack, CircularProgress } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Image from 'next/image'
import BaseLink from '../common/Link/BaseLink'
import { noImageUrl, productImageURL } from '../../utils/utils'
import { useCart } from '../../app/hooks/useCart'

const CartProductCard = ({product}) => {

    const { cartFetching, isClicked, addProductCart, removeProductCart, deleteProductCart } = useCart(product.id)

    return(
        <Card sx={{position: 'relative'}}>
            <CardActionArea
                component={BaseLink}
                href={`/products/${product.id}`}
                sx={{display: 'flex', justifyContent: 'space-between', height: '100%'}}
            >
                <CardMedia sx={{width: 120, height: 120, position: 'relative'}}>
                    <Image
                        src={product.image ? productImageURL + product.image : noImageUrl}
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
            </CardActionArea>
            <Stack
                justifyContent='space-between'
                alignItems='flex-end'
                padding={1}
                sx={{position: 'absolute', top: 0, right: 0, height: '100%'}}
            >
                {
                    cartFetching && isClicked
                    ?
                    <IconButton>
                        <CircularProgress size={20}/>
                    </IconButton>
                    :
                    <IconButton onClick={ e => deleteProductCart(e, product.id) }>
                        <CloseIcon fontSize='small' />
                    </IconButton>
                }
                <Stack direction='row' spacing={1}>
                    <Button
                        variant='outlined'
                        disabled={cartFetching && isClicked}
                        sx={{padding: 0, minWidth: 0}}
                        onClick={ e => addProductCart(e, product.id) }
                    >
                        <AddIcon fontSize='small' />
                    </Button>
                    <Typography variant='body1'>
                        {product.quantity}
                    </Typography>
                    <Button
                        variant='outlined'
                        disabled={cartFetching && isClicked || product.quantity === 1}
                        sx={{padding: 0, minWidth: 0, marginLeft: 0}}
                        onClick={ e => removeProductCart(e, product.id) }
                    >
                        <RemoveIcon fontSize='small' />
                    </Button>
                </Stack>
            </Stack>
        </Card>
    )
}

export default CartProductCard