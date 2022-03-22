import { Box, CircularProgress, IconButton, ListItem, ListItemText, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import { editBrand } from "../../../app/store/actions/async/admin"
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useFieldTitle } from "../../../app/hooks/useFormik/useFieldTitle"
import { toggleDeleteBrandDialog } from "../../../app/store/actions/dialogActions"

const BrandListItem = ({ brand }) => {

    const dispatch = useDispatch()

    const [edit, setEdit] = useState(false)

    const handleSubmitEdit = (data, { resetForm, setSubmitting }) => {
        dispatch(editBrand(brand.id, data, resetForm, setSubmitting, setEdit))
    }

    const {
        events, values, isSubmitting, touched, errors,
        getFieldProps, handleSubmit, handleEditClick, handleBlur
    } = useFieldTitle(brand.title, handleSubmitEdit, edit, setEdit)

    const dialogText = `Do you really want to delete the "${brand.title}"?`

    const openDeleteBrandDialog = () => {
        dispatch(toggleDeleteBrandDialog(true, dialogText, brand.id))
    }

    return (
        <ListItem>
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
                        error={ touched.title && Boolean(errors.title) }
                        { ...getFieldProps('title') }
                        onBlur={handleBlur}
                    />
                </form>
                :
                <ListItemText primary={brand.title}/>
            }
            {
                edit &&
                <IconButton
                    size='small'
                    disabled={Boolean(errors.title) || values.title == brand.title || isSubmitting}
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
                onClick={ openDeleteBrandDialog }
                disabled={isSubmitting}
            >
                <DeleteIcon fontSize='small'/>
            </IconButton>
        </ListItem>
    )
}

export default BrandListItem