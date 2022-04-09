import { Box, CircularProgress, IconButton, ListItem, ListItemText, TextField } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import SaveIcon from '@mui/icons-material/Save'
import { useSingleField } from "../../../../app/hooks/useFormik/useSingleField"
import { useState } from "react"

const AddListItem = ({
    field, placeholder, listItemText, listItemStyle,
    handleCreateSubmit, validationSchema, id
}) => {

    const [ edit, setEdit ] = useState(false)

    const onSubmit = (data, {resetForm, setSubmitting}) => {
        handleCreateSubmit(data, resetForm, setSubmitting, setEdit, id)
    }

    const {
        values, errors, touched, events, isSubmitting,
        getFieldProps, handleSubmit, handleEditClick, handleBlur
    } = useSingleField(field, null, onSubmit, validationSchema, setEdit)

    return (
        <ListItem selected={edit} sx={listItemStyle}>
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
                <ListItemText primary={listItemText}/>
            }
            {
                edit &&
                <IconButton
                    size='small'
                    onClick={handleSubmit}
                    disabled={Boolean(errors[field]) || !values[field] || isSubmitting}
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
                {edit ? <CancelIcon fontSize='small'/> : <AddCircleIcon fontSize='small'/>}
            </IconButton>
        </ListItem>
    )
}

export default AddListItem