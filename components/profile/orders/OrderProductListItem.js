import {Avatar, Box, Card, CardActionArea, Grid, IconButton, Tooltip, Typography} from "@mui/material"
import AddCommentIcon from '@mui/icons-material/AddComment'
import NextLink from '../../common/Link'
import {productImageURL} from "../../../utils/utils"
import { useRipple } from "../../../app/hooks/useRipple"
import { useToggle } from "../../../app/hooks/useToggle"

const OrderProductListItem = ({product}) => {

    const [ripple, events] = useRipple()
    const { openAddReviewDialog } = useToggle()

    return (
        <NextLink href={`/products/${product.product_id}`}>
            <Card sx={{position: 'relative'}}>
                <CardActionArea sx={{padding: 2}} disableRipple={ripple}>
                <Grid container alignItems='center'>
                    <Grid item xs={3}>
                        <Avatar
                            variant='rounded'
                            src={product.image ? productImageURL + product.image.src : undefined}
                            alt={product.image?.src}
                        />
                    </Grid>
                    <Grid item xs display='flex' justifyContent='center'>
                        <Typography variant='body2'>
                            {product.title}
                        </Typography>
                    </Grid>
                    <Grid item xs display='flex' justifyContent='center'>
                        <Typography variant='caption'>
                            $ {product.price} x {product.quantity}
                        </Typography>
                    </Grid>
                    <Grid item xs display='flex' justifyContent='center'>
                        <Typography variant='body2'>
                            {product.brand}
                        </Typography>
                    </Grid>
                    <Grid item xs display='flex' justifyContent='center'>
                        <Typography variant='body2'>
                            {product.shop}
                        </Typography>
                    </Grid>
                </Grid>
                </CardActionArea>
                <Box sx={{position: 'absolute', top: 0, right: 0}}>
                <Tooltip title='Write a Review'>
                    <IconButton
                        onClick={ e => openAddReviewDialog(e, product) }
                        {...events}
                    >
                        <AddCommentIcon/>
                    </IconButton>
                </Tooltip>
                </Box>
            </Card>
        </NextLink>
    )
}

export default OrderProductListItem