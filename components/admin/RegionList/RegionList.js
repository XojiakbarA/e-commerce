import { List, ListSubheader, Paper } from "@mui/material"
import { useRegion } from "../../../app/hooks/useFormik/useRegion"
import { useToggle } from "../../../app/hooks/useToggle"
import ConfirmDialog from "../../dialogs/ConfirmDialog"
import AddRegionListItem from "./AddRegionListItem"
import RegionListItem from "./RegionListItem"

const RegionList = ({ regions, selected, handleSelectedClick }) => {

    const { deleteRegionDialog, closeDeleteRegionDialog } = useToggle()

    const { isOpen, text, payload } = deleteRegionDialog

    const { isSubmitting, handleDeleteConfirmClick } = useRegion(payload, null, null, handleSelectedClick)

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
            <ConfirmDialog
                open={isOpen}
                content={text}
                loading={isSubmitting}
                handleCancelClick={closeDeleteRegionDialog}
                handleConfirmClick={handleDeleteConfirmClick}
            />
        </Paper>
    )
}

export default RegionList