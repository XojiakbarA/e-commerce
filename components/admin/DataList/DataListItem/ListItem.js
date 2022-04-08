import { Box, CircularProgress, IconButton, ListItem, ListItemText, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from "react"
import { useSingleField } from "../../../../app/hooks/useFormik/useSingleField"

const CustomListItem = ({
    item, field, placeholder, handleSubmitEdit,
    validationSchema, openDeleteDialog
}) => {

    const [edit, setEdit] = useState(false)

    const dialogText = `Do you really want to delete the "${item[field]}"?`

    const handleDeleteClick = () => {
        openDeleteDialog(dialogText, item.id)
    }
    const onSubmit = (data, { resetForm, setSubmitting }) => {
        handleSubmitEdit(item.id, data, resetForm, setSubmitting, setEdit)
    }

    const {
        events, values, isSubmitting, touched, errors,
        getFieldProps, handleSubmit, handleEditClick, handleBlur
    } = useSingleField(field, item[field], onSubmit, validationSchema, edit, setEdit)

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
                        placeholder={placeholder}
                        error={ touched[field] && Boolean(errors[field]) }
                        { ...getFieldProps(field) }
                        onBlur={handleBlur}
                    />
                </form>
                :
                <ListItemText primary={item[field]}/>
            }
            {
                edit &&
                <IconButton
                    size='small'
                    disabled={Boolean(errors[field]) || values[field] == item[field] || isSubmitting}
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
                onClick={ handleDeleteClick }
                disabled={isSubmitting}
            >
                <DeleteIcon fontSize='small'/>
            </IconButton>
        </ListItem>
    )
}

export default CustomListItem