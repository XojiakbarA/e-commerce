import { Box, CircularProgress, IconButton, ListItem, ListItemText, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useFieldName } from "../../../app/hooks/useFormik/useFieldName"
import { editDistrict } from "../../../app/store/actions/async/admin"
import { toggleDeleteDistrictDialog } from "../../../app/store/actions/dialogActions"

const DistrictListItem = ({ district }) => {

    const dispatch = useDispatch()

    const [edit, setEdit] = useState(false)

    const handleSubmitEdit = (data, { resetForm, setSubmitting }) => {
        dispatch(editDistrict(district.id, data, resetForm, setSubmitting, setEdit))
    }

    const {
        events, values, isSubmitting, touched, errors,
        getFieldProps, handleSubmit, handleEditClick, handleBlur
    } = useFieldName(district.name, handleSubmitEdit, setEdit)

    const dialogText = `Do you really want to delete the "${district.name}"?`

    const openDeleteDistrictDialog = () => {
        dispatch(toggleDeleteDistrictDialog(true, dialogText, district.id))
    }

    return (
        <ListItem selected={edit}>
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
                    />
                </form>
                :
                <ListItemText primary={district.name}/>
            }
            {
                edit &&
                <IconButton
                    size='small'
                    disabled={Boolean(errors.name) || values.name == district.name || isSubmitting}
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
            >
                {edit ? <EditOffIcon fontSize='small'/> : <EditIcon fontSize='small'/>}
            </IconButton>
            <IconButton
                size='small'
                onClick={ openDeleteDistrictDialog }
                disabled={isSubmitting}
            >
                <DeleteIcon fontSize='small'/>
            </IconButton>
        </ListItem>
    )
}

export default DistrictListItem