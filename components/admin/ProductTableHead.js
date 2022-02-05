import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { visuallyHidden } from '@mui/utils'

const labels = [
    { label: 'Title', field: 'title' },
    { label: 'Published', field: 'published' },
    { label: 'Stock', field: 'stock' },
    { label: 'Regular Price', field: 'price' },
    { label: 'Sales Price', field: 'sale_price' },
    { label: 'Rating', field: 'rating' },
    { label: 'Category', field: 'category' },
    { label: 'Brand', field: 'brand' },
    { label: 'Shop', field: 'shop' },
];

const ProductTableHead = ({ order, orderBy, onRequestSort }) => {

    return (
        <TableHead>
            <TableRow>
                <TableCell/>
                <TableCell/>
                {
                    labels.map((label) => (
                        <TableCell
                            key={label.field}
                            align={label.field === 'title' ? 'left' : 'right'}
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
                <TableCell/>
            </TableRow>
        </TableHead>
    )
}

export default ProductTableHead