import {Box, Card, CardActionArea, Grid, IconButton, Tooltip, Typography} from "@mui/material"
import AddCommentIcon from '@mui/icons-material/AddComment'
import PhotoIcon from '@mui/icons-material/Photo'
import BaseLink from '../../common/Link/BaseLink'
import {productImageURL} from "../../../utils/utils"
import { useRipple } from "../../../app/hooks/useRipple"
import ThumbImage from "../../common/Image/ThumbImage"
import { toggleAddReviewDialog } from "../../../app/store/actions/dialogActions"
import { useDispatch } from "react-redux"

const OrderProductListItem = ({product}) => {

    const dispatch = useDispatch()

    const [ripple, events] = useRipple()

    const openAddReviewDialog = (e) => {
        e.preventDefault()
        dispatch(toggleAddReviewDialog(true, product.product_id))
    }

    return (
        <Card sx={{position: 'relative'}}>
            <CardActionArea
                sx={{padding: 2}}
                disableRipple={ripple}
                href={`/products/${product.product_id}`}
                component={BaseLink}
            >
            <Grid container alignItems='center'>
                <Grid item xs={3}>
                    <ThumbImage
                        variant='rounded'
                        url={productImageURL}
                        src={product.image}
                        noImageIcon={<PhotoIcon/>}
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
                    onClick={ openAddReviewDialog }
                    {...events}
                >
                    <AddCommentIcon/>
                </IconButton>
            </Tooltip>
            </Box>
        </Card>
    )
}

export default OrderProductListItem