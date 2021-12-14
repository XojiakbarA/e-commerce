import { Paper, TableContainer, Table, TableHead, TableCell, TableBody, TableRow } from "@mui/material"

const UserInfoTable = ({ user }) => {
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
                        <TableCell>{user?.id}</TableCell>
                        <TableCell>{user?.name}</TableCell>
                        <TableCell>{user?.surname}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell>{user?.birth_date}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserInfoTable