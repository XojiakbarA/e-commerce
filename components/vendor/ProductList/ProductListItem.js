import { Avatar, Chip, Grid, IconButton, Paper, Rating, Tooltip, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { productImageURL } from "../../../utils/utils"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { getProduct, toggleEditProductDialog, toggleViewProductDialog } from "../../../redux/actions"

const ProductListItem = ({ product }) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const handleViewClick = () => {
        dispatch(getProduct(product.id))
        dispatch(toggleViewProductDialog(true))
    }
    const handleEditClick = () => {
        dispatch(getProduct(product.id))
        dispatch(toggleEditProductDialog(true))
    }

    return (
        <Paper sx={{padding: 2}}>
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
                    <Avatar
                        variant="rounded"
                        src={product.image ? productImageURL + product.image.src : undefined}
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
                        <IconButton onClick={handleEditClick}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <IconButton>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='View'>
                        <IconButton onClick={handleViewClick}>
                            <VisibilityIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ProductListItem