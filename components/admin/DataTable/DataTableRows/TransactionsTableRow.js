import { Stack, TableCell, TableRow, IconButton, Tooltip, Chip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CancelIcon from '@mui/icons-material/Cancel'
import PendingIcon from '@mui/icons-material/Pending'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ReplayIcon from '@mui/icons-material/Replay'
import Image from 'next/image'

const TransactionsTableRow = ({ transaction }) => {

    return (
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell component="th" scope="row">
                {transaction.name}
            </TableCell>
            <TableCell component="th" scope="row">
                {transaction.email}
            </TableCell>
            <TableCell component="th" scope="row">
                {transaction.phone}
            </TableCell>
            <TableCell component="th" scope="row">
                $ {transaction.total}
            </TableCell>
            <TableCell component="th" scope="row">
                {
                    transaction.pay_mode == 'click'
                    ?
                    <Image
                        src='/images/logo/click-logo.png'
                        alt='click-logo'
                        width={80}
                        height={30}
                    />
                    :
                    transaction.pay_mode == 'payme'
                    ?
                    <Image
                        src='/images/logo/payme-logo.png'
                        alt='click-logo'
                        width={80}
                        height={23}
                    />
                    :
                    transaction.pay_mode == 'uzcard'
                    ?
                    <Image
                        src='/images/logo/uzcard-logo.png'
                        alt='click-logo'
                        width={80}
                        height={42}
                    />
                    :
                    transaction.pay_mode == 'cod'
                    ?
                    <Image
                        src='/images/logo/cod-logo.jpeg'
                        alt='click-logo'
                        width={80}
                        height={31}
                    />
                    :
                    null
                }
            </TableCell>
            <TableCell component="th" scope="row">
                <Chip
                    size='small'
                    label={transaction.status}
                    icon={
                        transaction.status === 'approved' ?
                        <CheckCircleIcon/> :
                        transaction.status === 'declined' ?
                        <CancelIcon/> :
                        transaction.status === 'refunded' ?
                        <ReplayIcon/> :
                        <PendingIcon/>
                    }
                    color={
                        transaction.status === 'approved' ?
                        'success' :
                        transaction.status === 'declined' ?
                        'error' :
                        transaction.status === 'refunded' ?
                        'warning' :
                        'default'
                    }
                />
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
    )
}

export default TransactionsTableRow