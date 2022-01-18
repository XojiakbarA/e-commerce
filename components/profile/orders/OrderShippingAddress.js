import {List, ListItem, ListItemText, ListSubheader, Paper, Stack} from "@mui/material";

const labels = ['Name:', 'Phone:', 'Region:', 'District:', 'Street:', 'Home:']

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
                    <ListItemText>{order.name}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>{order.phone}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>{order.region.name}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>{order.district.name}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>{order.street}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>{order.home}</ListItemText>
                </ListItem>
            </List>
            </Stack>
        </Paper>
    )
}

export default OrderShippingAddress