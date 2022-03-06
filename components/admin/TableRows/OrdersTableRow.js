import { Stack, TableCell, TableRow, IconButton, Tooltip, AvatarGroup } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import PhotoIcon from '@mui/icons-material/Photo'
import ThumbImage from '../../common/Image/ThumbImage'
import { productImageURL } from '../../../utils/utils'

const OrdersTableRow = ({ order }) => {

    return (
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell component="th" scope="row">
                {order.name}
            </TableCell>
            <TableCell>{order.email}</TableCell>
            <TableCell>{order.phone}</TableCell>
            <TableCell>{order.region}</TableCell>
            <TableCell>{order.district}</TableCell>
            <TableCell>{order.street}</TableCell>
            <TableCell>{order.home}</TableCell>
            <TableCell>
                <AvatarGroup max={3} spacing='small'>
                    {
                        order.order_products.map(product => (
                            <ThumbImage
                                key={product.id}
                                url={productImageURL}
                                src={product.image}
                                noImageIcon={<PhotoIcon/>}
                            />
                        ))
                    }
                </AvatarGroup>
            </TableCell>
            <TableCell>$ {order.total}</TableCell>
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

export default OrdersTableRow