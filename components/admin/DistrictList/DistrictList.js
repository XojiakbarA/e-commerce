import { List, ListSubheader, Paper } from "@mui/material"
import { useDispatch } from "react-redux"
import { useFieldName } from "../../../app/hooks/useFormik/useFieldName"
import { useToggle } from "../../../app/hooks/useToggle"
import { deleteDistrict } from "../../../app/store/actions/async/admin"
import ConfirmDialog from "../../dialogs/ConfirmDialog"
import AddDistrictListItem from "./AddDistrictListItem"
import DistrictListItem from "./DistrictListItem"

const DistrictList = ({ region }) => {

    const dispatch = useDispatch()

    const { deleteDistrictDialog, closeDeleteDistrictDialog } = useToggle()

    const { isOpen, text, payload } = deleteDistrictDialog

    const { isSubmitting, setSubmitting } = useFieldName()

    const handleDeleteClick = () => {
        dispatch(deleteDistrict(payload.id, setSubmitting))
    }

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
                handleConfirmClick={handleDeleteClick}
            />
        </Paper>
    )
}

export default DistrictList