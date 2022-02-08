import {useState} from 'react'
import { Avatar, Stack, TableCell, TableRow, Typography, IconButton, Rating,Switch, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import PhotoIcon from '@mui/icons-material/Photo'
import Image from 'next/image'
import { productImageURL, userImageURL } from '../../../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { editReviewPublished } from '../../../app/store/actions/async/admin'

const ReviewsTableRow = ({ review }) => {

    const dispatch = useDispatch()
    const router = useRouter()

    const isLoading = useSelector(state => state.toggle.isLoading)

    const [isClicked, setIsClicked] = useState(false)

    const handleSwitchChange = (e, id) => {
        setIsClicked(review.id === id)
        dispatch(editReviewPublished(id, router.query, setIsClicked, {published: e.target.checked}))
    }
    
    return (
        <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
                <Switch
                    inputProps={{ 'aria-label': 'published' }}
                    checked={Boolean(review.published)}
                    onChange={e => handleSwitchChange(e, review.id)}
                    disabled={isLoading && isClicked}
                />
            </TableCell>
            <TableCell component="th" scope="row">
                <Avatar>
                    {
                        review.user_image &&
                        <Image
                            src={userImageURL + review.user_image.src}
                            alt={review.user_image.src}
                            layout='fill'
                            objectFit='cover'
                        />
                    }
                </Avatar>
            </TableCell>
            <TableCell component="th" scope="row">
                <Typography
                    variant='body2'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                    overflow='hidden'
                    width={150}
                >
                    {review.user_name}
                </Typography>
            </TableCell>
            <TableCell>
                <Rating value={review.rating} size='small' readOnly/>
            </TableCell>
            <TableCell component="th" scope="row">
                <Typography
                    variant='body2'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                    overflow='hidden'
                    width={200}
                >
                    {review.text}
                </Typography>
            </TableCell>
            <TableCell component="th" scope="row">
                <Avatar variant='rounded'>
                    {
                        review.product_image
                        ?
                        <Image
                            src={productImageURL + review.product_image.src}
                            alt={review.product_image.src}
                            layout='fill'
                            objectFit='cover'
                        />
                        :
                        <PhotoIcon/>
                    }
                </Avatar>
            </TableCell>
            <TableCell>
                <Typography
                    variant='body2'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                    overflow='hidden'
                    width={200}
                >
                    {review.product_title}
                </Typography>
            </TableCell>
            <TableCell>{review.created_at}</TableCell>
            <TableCell>
                <Stack direction='row' spacing={1}>
                    <Tooltip title='View'>
                        <IconButton
                            aria-label="edit-product"
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
        </>
    )
}

export default ReviewsTableRow