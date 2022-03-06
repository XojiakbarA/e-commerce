import { Button, IconButton, Typography, Card, CardActionArea, CardMedia, CardContent, Stack, CircularProgress } from '@mui/material'
import BaseLink from '../../common/Link/BaseLink'
import Image from 'next/image'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { noImageUrl, productImageURL } from '../../../utils/utils'
import { useRipple } from '../../../app/hooks/useRipple'
import { useCart } from '../../../app/hooks/useCart'

const SidebarProductCard = ({product}) => {

    const [ripple, events] = useRipple()

    const { cartFetching, isClicked, addProductCart, removeProductCart, deleteProductCart} = useCart(product.id)

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
                    <Button
                        variant='outlined'
                        sx={{padding: 0, minWidth: 0}}
                        disabled={cartFetching && isClicked}
                        onClick={ e => addProductCart(e, product.id) }
                    >
                        <AddIcon fontSize='small' />
                    </Button>
                    <Typography variant='body1'>
                        {product.quantity}
                    </Typography>
                    <Button
                        variant='outlined'
                        sx={{padding: 0, minWidth: 0, marginLeft: 0}}
                        disabled={cartFetching && isClicked || product.quantity === 1}
                        onClick={ e => removeProductCart(e, product.id) }
                    >
                        <RemoveIcon fontSize='small' />
                    </Button>
                </Stack>
                <CardMedia sx={{position: 'relative', width: 100, height: 100}}>
                    <Image
                        src={product.image ? productImageURL + product.image : noImageUrl}
                        alt={product.title}
                        layout='fill'
                        objectFit='cover'
                    />
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
                    sx={{position: 'absolute', top: 0, right: 0}}
                    { ...events }
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
                </Stack>
            </CardActionArea>
        </Card>
    )
}

export default SidebarProductCard