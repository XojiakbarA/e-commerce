import {List, ListItem, ListItemText, ListSubheader, Paper, Stack} from "@mui/material";

const labels = ['Order ID:', 'Data Purchased:', 'Total:']

const OrderDetails = ({order}) => {

    return (
        <Paper sx={{padding: 2}}>
            <ListSubheader>Details</ListSubheader>
            <Stack direction='row'>
            <List>
                {
                    labels.map((label, i) => (
                        <ListItem key={i}>
                            <ListItemText>{label}</ListItemText>
                        </ListItem>
                    ))
                }
            </List>
            <List>
                <ListItem>
                    <ListItemText>{order?.id}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>{order?.created_at}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>$ {order?.total}</ListItemText>
                </ListItem>
            </List>
            </Stack>
        </Paper>
    )
}

export default OrderDetails