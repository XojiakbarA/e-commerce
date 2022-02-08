import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { visuallyHidden } from '@mui/utils'

const labels = [
    {label: 'Published', field: 'published'},
    {label: 'User', field: 'user_name'},
    {label: 'Rating', field: 'rating'},
    {label: 'Text', field: 'text'},
    {label: 'Product', field: 'product_title'},
    {label: 'Created At', field: 'created_at'}
]

const ReviewsTableHead = ({ order, orderBy, onRequestSort }) => {

    return (
        <TableHead>
            <TableRow>
                {
                    labels.map((label) => (
                        <TableCell
                            key={label.field}
                            colSpan={
                                label.field === 'product_title' ||
                                label.field === 'created_at' ||
                                label.field === 'user_name'
                                ? 2 : 0
                            }
                            sortDirection={orderBy === label.field ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === label.field}
                                direction={orderBy === label.field ? order : 'asc'}
                                onClick={e => onRequestSort(e, label.field)}
                            >
                                {label.label}
                                {orderBy === label.field ? (
                                    <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    )
}

export default ReviewsTableHead