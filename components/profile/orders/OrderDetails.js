import { ListSubheader, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material'

const OrderDetails = ({ order }) => {

    return (
        <TableContainer component={Paper} sx={{ bgcolor: 'inherit' }}>
            <ListSubheader sx={{ bgcolor: 'inherit' }}>Order Details</ListSubheader>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">Name:</TableCell>
                        <TableCell >{order.name}</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">Phone:</TableCell>
                        <TableCell >{order.phone}</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">Region:</TableCell>
                        <TableCell >{order.region.name}</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">District:</TableCell>
                        <TableCell >{order.district.name}</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">Street:</TableCell>
                        <TableCell >{order.street}</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">Home:</TableCell>
                        <TableCell >{order.home}</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">Order ID:</TableCell>
                        <TableCell >{order.id}</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">Data Purchased:</TableCell>
                        <TableCell >{order.created_at}</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">Total:</TableCell>
                        <TableCell >$ {order.total}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default OrderDetails