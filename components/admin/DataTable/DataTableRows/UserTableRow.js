import { Stack, TableCell, TableRow, IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { userImageURL } from '../../../../utils/utils'
import ThumbImage from '../../../common/Image/ThumbImage'

const UserTableRow = ({ user }) => {

    return (
        <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
                {user.id}
            </TableCell>
            <TableCell component="th" scope="row">
                <ThumbImage
                    url={userImageURL}
                    src={user.image?.src}
                />
            </TableCell>
            <TableCell component="th" scope="row">
                {user.first_name}
            </TableCell>
            <TableCell component="th" scope="row">
                {user.last_name || '-'}
            </TableCell>
            <TableCell component="th" scope="row">
                {user.email}
            </TableCell>
            <TableCell component="th" scope="row">
                {user.phone || '-'}
            </TableCell>
            <TableCell component="th" scope="row">
                {user.birth_date || '-'}
            </TableCell>
            <TableCell component="th" scope="row">
                {user.role || '-'}
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

export default UserTableRow