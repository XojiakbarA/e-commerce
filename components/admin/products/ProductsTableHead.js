import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'

const labels = [
    { label: 'Published', field: 'published' },
    { label: 'Title', field: 'title' },
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
                {
                    labels.map((label) => (
                        <TableCell
                            key={label.field}
                            colSpan={
                                label.field === 'title' ||
                                label.field === 'shop'
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
                            </TableSortLabel>
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    )
}

export default ProductTableHead