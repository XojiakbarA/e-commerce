import { Box, CircularProgress, IconButton, ListItem, ListItemText, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useDistrict } from "../../../app/hooks/useFormik/useDistrict"
import { editDistrict } from "../../../app/store/actions/async/admin"

const DistrictListItem = ({ district }) => {

    const dispatch = useDispatch()

    const [edit, setEdit] = useState(false)

    const handleSubmitEdit = (data, { resetForm, setSubmitting }) => {
        dispatch(editDistrict(district.id, data, resetForm, setSubmitting, setEdit))
    }

    const {
        events, values, isSubmitting, touched, errors, getFieldProps,
        handleSubmit, handleEditClick, handleSubmitClick, handleBlur, handleDeleteClick
    } = useDistrict(district, handleSubmitEdit, setEdit)

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
                    disabled={Boolean(errors.name) || values.name == district.name}
                    onClick={ handleSubmitClick }
                    { ...events }
                >
                    <SaveIcon fontSize='small'/>
                </IconButton>
            }
            <IconButton
                size='small'
                onClick={handleEditClick}
            >
                {edit ? <EditOffIcon fontSize='small'/> : <EditIcon fontSize='small'/>}
            </IconButton>
            <IconButton
                size='small'
                onClick={handleDeleteClick}
            >
                <DeleteIcon fontSize='small'/>
            </IconButton>
        </ListItem>
    )
}

export default DistrictListItem