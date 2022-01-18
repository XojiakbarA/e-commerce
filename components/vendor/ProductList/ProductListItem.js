import { Avatar, Chip, Grid, IconButton, Paper, Rating, Tooltip, Typography } from "@mui/material"
import Image from 'next/image'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { productImageURL, noImageUrl } from "../../../utils/utils"
import { useDispatch } from "react-redux"
import { getProduct, setProduct, toggleDeleteProductDialog, toggleEditProductDialog, toggleViewProductDialog } from "../../../redux/actions"

const ProductListItem = ({ product }) => {

    const dispatch = useDispatch()

    const handleViewClick = () => {
        dispatch(getProduct(product.id))
        dispatch(toggleViewProductDialog(true))
    }
    const handleEditClick = () => {
        dispatch(getProduct(product.id))
        dispatch(toggleEditProductDialog(true))
    }
    const handleDeleteClick = () => {
        dispatch(setProduct(product))
        dispatch(toggleDeleteProductDialog(true))
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
                    <Avatar variant="rounded">
                        <Image
                            src={product.image ? productImageURL + product.image.src : noImageUrl}
                            alt={product.title}
                            layout='fill'
                            objectFit='cover'
                        />
                    </Avatar>
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
                        <IconButton onClick={handleDeleteClick}>
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