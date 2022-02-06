import {useState} from 'react'
import { Avatar, Stack, Box, TableCell, TableRow, Typography, IconButton, Collapse, Rating, Grid, Switch, Chip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import EditIcon from '@mui/icons-material/Edit'
import Image from 'next/image'
import { noImageUrl, productImageURL } from '../../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { editProductPublished } from '../../app/store/actions/async/admin'
import { useRouter } from 'next/router'

const ProductTableRow = ({ product }) => {

    const dispatch = useDispatch()
    const router = useRouter()

    const isLoading = useSelector(state => state.toggle.isLoading)

    const [open, setOpen] = useState(false)
    const [published, setPublished] = useState(Boolean(product.published))
    const [isClicked, setIsClicked] = useState(false)

    const handleSwitchChange = (e, id) => {
        dispatch(editProductPublished(id, router.query, setPublished, {published: e.target.checked}))
        setIsClicked(product.id === id)
    }
    
    return (
        <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                <Avatar variant='rounded'>
                    <Image
                        src={product.image ? productImageURL + product.image.src : noImageUrl}
                        alt='product-image'
                        layout='fill'
                        objectFit='cover'
                    />
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
            <TableCell align="right">
                <Switch
                    inputProps={{ 'aria-label': 'published' }}
                    checked={published}
                    onChange={e => handleSwitchChange(e, product.id)}
                    disabled={isLoading && isClicked}
                />
            </TableCell>
            <TableCell align="right">
                <Chip
                    label={product.stock}
                    size='small'
                    variant='outlined'
                    color={product.stock < 6 ? 'warning' : 'info'}
                />
            </TableCell>
            <TableCell align="right">$ {product.price}</TableCell>
            <TableCell align="right">{product.sale_price ? `$ ${product.sale_price}` : '-'}</TableCell>
            <TableCell align="right">
                <Rating value={product.rating} size='small' readOnly/>
            </TableCell>
            <TableCell align="right">{product.category.title}</TableCell>
            <TableCell align="right">{product.brand.title}</TableCell>
            <TableCell align="right">{product.shop.title}</TableCell>
            <TableCell>
                <Stack direction='row' spacing={1}>
                    <IconButton
                        aria-label="edit-product"
                        size="small"
                    >
                        <EditIcon fontSize='small'/>
                    </IconButton>
                    <IconButton
                        aria-label="delete-product"
                        size="small"
                    >
                        <DeleteIcon fontSize='small'/>
                    </IconButton>
                </Stack>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1} width='100%'>
                        <Grid container spacing={2}>
                            <Grid item xs>
                                <Stack direction='row' spacing={1}>
                                    {
                                        product.images.length > 0
                                        ?
                                        product.images.map(image => (
                                            <Avatar
                                                key={image.id}
                                                src={productImageURL + image.src}
                                                alt={image.src}
                                                variant="rounded"
                                                sx={{width: 100, height: 100}}
                                            >
                                                <Image
                                                    src={productImageURL + image.src}
                                                    alt={image.src}
                                                    layout='fill'
                                                    objectFit='cover'
                                                />
                                            </Avatar>
                                        ))
                                        :
                                        <Avatar
                                            src={noImageUrl}
                                            alt={noImageUrl}
                                            variant="rounded"
                                            sx={{width: 100, height: 100}}
                                        />
                                    }
                                    
                                </Stack>
                            </Grid>
                            <Grid item xs>
                                <Typography
                                    variant='body2'
                                    component='div'
                                    width={500}
                                >
                                    {product.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
        </>
    )
}

export default ProductTableRow