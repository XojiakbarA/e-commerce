import {useState} from 'react'
import { Avatar, Stack, TableCell, TableRow, Typography, IconButton, Rating, Switch, Chip, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import PhotoIcon from '@mui/icons-material/Photo'
import Image from 'next/image'
import { productImageURL } from '../../../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { editProductPublished } from '../../../app/store/actions/async/admin'
import { useRouter } from 'next/router'

const ProductsTableRow = ({ product }) => {

    const dispatch = useDispatch()
    const router = useRouter()

    const isLoading = useSelector(state => state.toggle.isLoading)

    const [isClicked, setIsClicked] = useState(false)

    const handleSwitchChange = (e, id) => {
        setIsClicked(product.id === id)
        dispatch(editProductPublished(id, router.query, setIsClicked, {published: e.target.checked}))
    }
    
    return (
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
                <Switch
                    inputProps={{ 'aria-label': 'published' }}
                    checked={Boolean(product.published)}
                    onChange={e => handleSwitchChange(e, product.id)}
                    disabled={isLoading && isClicked}
                />
            </TableCell>
            <TableCell component="th" scope="row">
                <Avatar variant='rounded'>
                    {
                        product.image
                        ?
                        <Image
                            src={productImageURL + product.image.src}
                            alt={product.image.src}
                            layout='fill'
                            objectFit='cover'
                        />
                        :
                        <PhotoIcon/>
                    }
                </Avatar>
            </TableCell>
            <TableCell component="th" scope="row">
                <Typography
                    variant='body2'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                    overflow='hidden'
                    width={200}
                >
                    {product.title}
                </Typography>
            </TableCell>
            <TableCell>
                <Chip
                    label={product.stock}
                    size='small'
                    variant='outlined'
                    color={product.stock < 6 ? 'warning' : 'info'}
                />
            </TableCell>
            <TableCell>$ {product.price}</TableCell>
            <TableCell>{product.sale_price ? `$ ${product.sale_price}` : '-'}</TableCell>
            <TableCell>
                <Rating value={product.rating} size='small' readOnly/>
            </TableCell>
            <TableCell>{product.category_title}</TableCell>
            <TableCell>{product.brand_title}</TableCell>
            <TableCell>{product.shop_title}</TableCell>
            <TableCell>
                <Stack direction='row' spacing={1}>
                    <Tooltip title='View'>
                        <IconButton
                            aria-label="view-product"
                            size="small"
                        >
                            <VisibilityIcon fontSize='small'/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Edit'>
                        <IconButton
                            aria-label="edit-product"
                            size="small"
                        >
                            <EditIcon fontSize='small'/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                    <IconButton
                        aria-label="delete-product"
                        size="small"
                    >
                        <DeleteIcon fontSize='small'/>
                    </IconButton>
                    </Tooltip>
                </Stack>
            </TableCell>
        </TableRow>
    )
}

export default ProductsTableRow