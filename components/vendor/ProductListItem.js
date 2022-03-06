import { Card, Chip, Grid, IconButton, Rating, Tooltip, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import PhotoIcon from '@mui/icons-material/Photo'
import { productImageURL } from "../../utils/utils"
import { useToggle } from "../../app/hooks/useToggle"
import ThumbImage from "../common/Image/ThumbImage"

const ProductListItem = ({ product }) => {

    const { openEditProductDialog, openDeleteProductDialog, openViewProductDialog } = useToggle()

    const dialogText = `Do you really want to delete the "${product.title}"?`

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
                        src={product.image?.src}
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
                        <IconButton onClick={e => openEditProductDialog(product)}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <IconButton onClick={e => openDeleteProductDialog(dialogText, product)}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='View'>
                        <IconButton onClick={e => openViewProductDialog(product)}>
                            <VisibilityIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Card>
    )
}

export default ProductListItem