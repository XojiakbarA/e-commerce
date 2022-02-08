import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper} from '@mui/material'
import TableHead from './ReviewsTableHead'
import { useRouter } from 'next/router'
import ReviewsTableRow from './ReviewsTableRow'

const ReviewsTable = ({ reviews, meta }) => {

    const router = useRouter()

    let initOrder = 'asc'
    let initOrderBy = ''

    if (router.query.sort) {
        initOrder = router.query.sort[1]
        initOrderBy = router.query.sort[0]
    }

    const [order, setOrder] = useState(initOrder)
    const [orderBy, setOrderBy] = useState(initOrderBy)

    useEffect(() => {
        if (!router.query.sort_by) {
            setOrderBy('')
        }
    }, [router.query.sort_by])

    const handleRequestSort = (event, field) => {
        const isAsc = orderBy === field && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(field)

        router.push({
            query: {
                ...router.query,
                page: 1,
                sort_by: [field, isAsc ? 'desc' : 'asc'] }
        })
    }

    const handleChangePage = (event, newPage) => {
        router.push({
            query: { ...router.query, page: newPage + 1 }
        })
    };

    const handleChangeRowsPerPage = (event) => {
        router.push({
            query: { ...router.query, count: event.target.value, page: 1 }
        })
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    let emptyRows
    if (meta.total % meta.per_page === 0) {
        emptyRows = 0
    } else {
        emptyRows = meta.per_page - (meta.total % meta.per_page)
    }

    return (
        <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    
                >
                    <TableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {
                            reviews.map((review) => (
                                <ReviewsTableRow key={review.id} review={review}/>
                            ))}
                        {
                            emptyRows > 0 && Number(router.query.page) === meta.last_page && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={12} />
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={meta.total}
                rowsPerPage={Number(meta.per_page)}
                page={meta.current_page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                showFirstButton
                showLastButton
            />
        </Paper>
    )
}

export default ReviewsTable