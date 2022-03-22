import { List, ListSubheader, Paper } from "@mui/material"
import AddRegionListItem from "./AddRegionListItem"
import RegionListItem from "./RegionListItem"

const RegionList = ({ regions, selected, handleSelectedClick }) => {

    return (
        <Paper>
            <List>
                <ListSubheader>Regions</ListSubheader>
                {
                    regions.map(region => (
                        <RegionListItem
                            key={region.id}
                            region={region}
                            selected={selected}
                            handleSelectedClick={handleSelectedClick}
                        />
                    ))
                }
                <AddRegionListItem handleSelectedClick={handleSelectedClick}/>
            </List>
        </Paper>
    )
}

export default RegionList