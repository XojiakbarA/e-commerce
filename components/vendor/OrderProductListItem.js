import { Avatar, Grid, IconButton, Paper, Typography } from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { productImageURL } from "../../utils/utils"

const OrderProductListItem = ({product}) => {

    return (
        <Paper sx={{padding: 2}}>
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
                    <Typography variant='body2'>
                        $ {product.price}
                    </Typography>
                </Grid>
                <Grid item xs display='flex' justifyContent='center'>
                    <Typography variant='body2'>
                        {product.brand}
                    </Typography>
                </Grid>
                <Grid item xs display='flex' justifyContent='center' alignItems='center'>
                    <IconButton>
                        <AddCircleOutlineIcon/>
                    </IconButton>
                    <Typography variant="body2">
                        {product.quantity}
                    </Typography>
                    <IconButton>
                        <RemoveCircleOutlineIcon/>
                    </IconButton>
                    <IconButton>
                        <DeleteForeverIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default OrderProductListItem