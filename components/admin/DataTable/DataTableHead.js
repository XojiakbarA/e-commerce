import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'

const DataTableHead = ({ order, orderBy, onRequestSort, labels, colSpan }) => {

    return (
        <TableHead>
            <TableRow>
                {
                    labels.map((label) => (
                        <TableCell
                            key={label.field}
                            colSpan={colSpan(label.field)}
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

export default DataTableHead