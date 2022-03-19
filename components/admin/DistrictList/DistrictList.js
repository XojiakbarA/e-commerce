import { List, ListSubheader, Paper } from "@mui/material"
import { useDistrict } from "../../../app/hooks/useFormik/useDistrict"
import { useToggle } from "../../../app/hooks/useToggle"
import ConfirmDialog from "../../dialogs/ConfirmDialog"
import AddDistrictListItem from "./AddDistrictListItem"
import DistrictListItem from "./DistrictListItem"

const DistrictList = ({ region }) => {

    const { deleteDistrictDialog, closeDeleteDistrictDialog } = useToggle()

    const { isOpen, text, payload } = deleteDistrictDialog

    const { isSubmitting, handleDeleteConfirmClick } = useDistrict(payload)

    return (
        <Paper>
            <List>
                <ListSubheader>Districts</ListSubheader>
                {
                    region.districts.map(district => (
                        <DistrictListItem key={district.id} district={district}/>
                    ))
                }
                <AddDistrictListItem region={region}/>
            </List>
            <ConfirmDialog
                open={isOpen}
                content={text}
                loading={isSubmitting}
                handleCancelClick={closeDeleteDistrictDialog}
                handleConfirmClick={handleDeleteConfirmClick}
            />
        </Paper>
    )
}

export default DistrictList