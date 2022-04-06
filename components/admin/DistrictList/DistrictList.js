import { List, ListSubheader, Paper } from "@mui/material"
import AddDistrictListItem from "./AddDistrictListItem"
import DistrictListItem from "./DistrictListItem"

const DistrictList = ({ region }) => {

    return (
        <Paper>
            <List>
                <ListSubheader sx={{ bgcolor: 'inherit' }}>Districts</ListSubheader>
                {
                    region.districts.map(district => (
                        <DistrictListItem key={district.id} district={district}/>
                    ))
                }
                <AddDistrictListItem region={region}/>
            </List>
        </Paper>
    )
}

export default DistrictList