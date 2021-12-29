import {Grid, List, ListItem, ListItemText, ListSubheader, Paper, Stack} from "@mui/material";

const labels = ['Name:', 'Phone:', 'Country:', 'Address:', 'Zip Code:']

const OrderShippingAddress = ({order}) => {
    return (
        <Paper sx={{padding: 2}}>
            <ListSubheader>Shipping Address</ListSubheader>
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
                    <ListItemText>{order?.name}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>{order?.phone}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>{order?.country}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>{order?.address}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>{order?.zip_code}</ListItemText>
                </ListItem>
            </List>
            </Stack>
        </Paper>
    )
}

export default OrderShippingAddress