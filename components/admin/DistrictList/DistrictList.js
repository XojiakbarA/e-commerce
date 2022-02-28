import { List, ListSubheader, Paper } from "@mui/material"
import { useEditDistrict } from "../../../app/hooks/useFormik/useEditDistrict"
import { useToggle } from "../../../app/hooks/useToggle"
import ConfirmDialog from "../../dialogs/ConfirmDialog"
import DistrictListItem from "./DistrictListItem"

const DistrictList = ({ districts }) => {

    const { deleteDistrictDialog, closeDeleteDistrictDialog } = useToggle()

    const { isOpen, text, payload } = deleteDistrictDialog
// console.log(deleteDistrictDialog)
    const { isSubmitting, handleDeleteConfirmClick } = useEditDistrict(payload)

    return (
        <Paper>
            <List>
                <ListSubheader>Districts</ListSubheader>
            {
                districts.map(district => (
                    <DistrictListItem key={district.id} district={district}/>
                ))
            }
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