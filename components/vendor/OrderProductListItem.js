import { Avatar, Card, Chip, Grid, IconButton, Typography } from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import PhotoIcon from '@mui/icons-material/Photo'
import Image from 'next/image'
import { productImageURL } from "../../utils/utils"

const OrderProductListItem = ({product, count, handleAddClick, handleRemoveClick, setSaveDisabled, editDisabled}) => {

    return (
        <Card sx={{padding: 2}}>
            <Grid container alignItems='center'>
                <Grid item xs={3}>
                    <Avatar variant='rounded'>
                        {
                            product.image
                            ?
                            <Image
                                src={productImageURL + product.image}
                                alt={product.image}
                                layout='fill'
                                objectFit='cover'
                            />
                            :
                            <PhotoIcon/>
                        }
                    </Avatar>
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
                        disabled={editDisabled || count === 1}
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
        </Card>
    )
}

export default OrderProductListItem