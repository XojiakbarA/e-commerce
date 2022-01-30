import { Avatar, Chip, Grid, IconButton, Paper, Typography } from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { productImageURL } from "../../utils/utils"

const OrderProductListItem = ({product, count, handleAddClick, handleRemoveClick, setSaveDisabled, editDisabled}) => {

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
                    <IconButton
                        disabled={editDisabled}
                        onClick={() => {
                            handleAddClick(product.id)
                            setSaveDisabled(false)
                        }}
                    >
                        <AddCircleOutlineIcon/>
                    </IconButton>
                    <Chip
                        label={count}
                        variant="outlined"
                        size="small"
                    />
                    <IconButton
                        disabled={editDisabled}
                        onClick={() => {
                            handleRemoveClick(product.id)
                            setSaveDisabled(false)
                        }}
                    >
                        <RemoveCircleOutlineIcon/>
                    </IconButton>
                    <IconButton
                        disabled={editDisabled}
                    >
                        <DeleteForeverIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default OrderProductListItem