import { List, ListSubheader, Paper } from "@mui/material"
import { useDispatch } from "react-redux"
import { useFieldName } from "../../../app/hooks/useFormik/useFieldName"
import { useToggle } from "../../../app/hooks/useToggle"
import { deleteRegion } from "../../../app/store/actions/async/admin"
import ConfirmDialog from "../../dialogs/ConfirmDialog"
import AddRegionListItem from "./AddRegionListItem"
import RegionListItem from "./RegionListItem"

const RegionList = ({ regions, selected, handleSelectedClick }) => {

    const dispatch = useDispatch()

    const { deleteRegionDialog, closeDeleteRegionDialog } = useToggle()

    const { isOpen, text, payload } = deleteRegionDialog

    const { isSubmitting, setSubmitting } = useFieldName()

    const handleDeleteClick = () => {
        dispatch(deleteRegion(payload.id, setSubmitting, handleSelectedClick))
    }

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
                handleConfirmClick={handleDeleteClick}
            />
        </Paper>
    )
}

export default RegionList