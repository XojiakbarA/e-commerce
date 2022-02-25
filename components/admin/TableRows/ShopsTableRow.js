import { Avatar, Stack, TableCell, TableRow, IconButton, Tooltip, Rating } from '@mui/material'
import PhotoIcon from '@mui/icons-material/Photo'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Image from 'next/image'
import { shopImageURL } from '../../../utils/utils'

const ShopsTableRow = ({ shop }) => {

    return (
        <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell component="th" scope="row">
                <Avatar>
                    {
                        shop.av_image
                        ?
                        <Image
                            src={shopImageURL + shop.av_image}
                            alt={shop.av_image}
                            layout='fill'
                            objectFit='cover'
                        />
                        :
                        <PhotoIcon/>
                    }
                </Avatar>
            </TableCell>
            <TableCell component="th" scope="row">
                {shop.title}
            </TableCell>
            <TableCell>
                <Rating value={shop.rating} size='small' readOnly/>
            </TableCell>
            <TableCell component="th" scope="row">
                {shop.first_name || '-'}
            </TableCell>
            <TableCell component="th" scope="row">
                {shop.last_name || '-'}
            </TableCell>
            <TableCell component="th" scope="row">
                {shop.region}
            </TableCell>
            <TableCell component="th" scope="row">
                {shop.district}
            </TableCell>
            <TableCell component="th" scope="row">
                {shop.street}
            </TableCell>
            <TableCell component="th" scope="row">
                {shop.home}
            </TableCell>
            <TableCell component="th" scope="row">
                {shop.phone || '-'}
            </TableCell>
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

export default ShopsTableRow