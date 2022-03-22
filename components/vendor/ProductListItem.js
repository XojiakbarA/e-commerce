import { Card, Chip, Grid, IconButton, Rating, Tooltip, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import PhotoIcon from '@mui/icons-material/Photo'
import { productImageURL } from "../../utils/utils"
import ThumbImage from "../common/Image/ThumbImage"
import { toggleDeleteProductDialog, toggleEditProductDialog, toggleViewProductDialog } from "../../app/store/actions/dialogActions"
import { useDispatch } from "react-redux"

const ProductListItem = ({ product }) => {

    const dispatch = useDispatch()

    const dialogText = `Do you really want to delete the "${product.title}"?`

    const openEditProductDialog = () => {
        dispatch(toggleEditProductDialog(true, product.id))
    }
    const openDeleteProductDialog = () => {
        dispatch(toggleDeleteProductDialog(true, dialogText, product.id))
    }
    const openViewProductDialog = () => {
        dispatch(toggleViewProductDialog(true, product.id))
    }

    return (
        <Card sx={{padding: 2}}>
            <Grid container alignItems='center'>
                <Grid item xs={3}>
                    <Typography
                        variant='body2'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                        overflow='hidden'
                    >
                        {product.title}
                    </Typography>
                </Grid>
                <Grid item xs display='flex' justifyContent='center'>
                    <ThumbImage
                        variant="rounded"
                        url={productImageURL}
                        src={product.image}
                        noImageIcon={<PhotoIcon/>}
                    />
                </Grid>
                <Grid item xs display='flex' justifyContent='center'>
                    <Chip label={product.stock} color={product.stock < 6 ? 'warning' : 'info'} size='small' variant='outlined'/>
                </Grid>
                <Grid item xs display='flex' justifyContent='center'>
                    <Typography variant='body2'>
                        $ {product.price}
                    </Typography>
                </Grid>
                <Grid item xs display='flex' justifyContent='center'>
                    <Typography variant='body2'>
                        {product.sale_price === null ? '-' : `$ ${product.sale_price}`}
                    </Typography>
                </Grid>
                <Grid item xs display='flex' justifyContent='center'>
                    <Rating value={product.rating} readOnly size="small"/>
                </Grid>
                <Grid item xs display='flex'>
                    <Tooltip title='Edit'>
                        <IconButton onClick={ openEditProductDialog }>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <IconButton onClick={ openDeleteProductDialog }>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='View'>
                        <IconButton onClick={ openViewProductDialog }>
                            <VisibilityIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Card>
    )
}

export default ProductListItem