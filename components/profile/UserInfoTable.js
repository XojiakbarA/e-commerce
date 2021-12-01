import { Paper, TableContainer, Table, TableHead, TableCell, TableBody, TableRow } from "@mui/material"

const UserInfoTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>User ID</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>E-mail</TableCell>
                        <TableCell>Birth Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>13</TableCell>
                        <TableCell>Xojiakbar</TableCell>
                        <TableCell>Akramov</TableCell>
                        <TableCell>xoji@mail.ru</TableCell>
                        <TableCell>11.05.1995</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserInfoTable