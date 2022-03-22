import { Box, CircularProgress, IconButton, ListItemButton, ListItemText, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import { useFieldName } from "../../../app/hooks/useFormik/useFieldName"
import { useDispatch } from "react-redux"
import { editRegion } from "../../../app/store/actions/async/admin"
import { useState } from "react"
import { toggleDeleteRegionDialog } from "../../../app/store/actions/dialogActions"

const RegionListItem = ({ region, selected, handleSelectedClick }) => {

    const dispatch = useDispatch()

    const [edit, setEdit] = useState(false)

    const handleSubmitEdit = (data, { resetForm, setSubmitting }) => {
        dispatch(editRegion(region.id, data, resetForm, setSubmitting, setEdit))
    }

    const {
        ripple, events, values, isSubmitting, touched, errors,
        getFieldProps, handleSubmit, handleEditClick, handleBlur
    } = useFieldName(region.name, handleSubmitEdit, setEdit)

    const dialogText = `Do you really want to delete the "${region.name}"?`

    const openDeleteRegionDialog = (e) => {
        e.stopPropagation()
        dispatch(toggleDeleteRegionDialog(true, dialogText, region.id))
    }

    return (
        <ListItemButton
            disableRipple={ripple}
            selected={selected.id === region.id || edit}
            onClick={e => handleSelectedClick(region)}
        >
            {
                isSubmitting
                ?
                <>
                <CircularProgress size={20}/>
                <Box sx={{ flexGrow: 1 }}/>
                </>
                :
                edit
                ?
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        autoFocus
                        variant='standard'
                        error={ touched.name && Boolean(errors.name) }
                        { ...getFieldProps('name') }
                        onBlur={handleBlur}
                        { ...events }
                    />
                </form>
                :
                <ListItemText primary={region.name}/>
            }
            {
                edit &&
                <IconButton
                    size='small'
                    disabled={Boolean(errors.name) || values.name == region.name || isSubmitting}
                    onClick={ handleSubmit }
                    { ...events }
                >
                    <SaveIcon fontSize='small'/>
                </IconButton>
            }
            <IconButton
                size='small'
                onClick={handleEditClick}
                disabled={isSubmitting}
                { ...events }
            >
                {edit ? <EditOffIcon fontSize='small'/> : <EditIcon fontSize='small'/>}
            </IconButton>
            <IconButton
                size='small'
                onClick={ openDeleteRegionDialog }
                disabled={isSubmitting}
                { ...events }
            >
                <DeleteIcon fontSize='small'/>
            </IconButton>
        </ListItemButton>
    )
}

export default RegionListItem