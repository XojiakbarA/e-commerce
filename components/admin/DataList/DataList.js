import { List, ListSubheader, Paper } from "@mui/material"

const DataList = ({ subHeader, children }) => {

    return (
        <Paper>
            <List>
                <ListSubheader sx={{ bgcolor: 'inherit' }}>{subHeader}</ListSubheader>
                { children }
            </List>
        </Paper>
    )
}

export default DataList