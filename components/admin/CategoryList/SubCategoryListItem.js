import { Box, CircularProgress, IconButton, ListItem, ListItemText, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useFieldTitle } from "../../../app/hooks/useFormik/useFieldTitle"
import { editSubCategory } from "../../../app/store/actions/async/admin"
import { toggleDeleteSubCategoryDialog } from "../../../app/store/actions/dialogActions"

const SubCategoryListItem = ({ sub_category }) => {

    const dispatch = useDispatch()

    const [ edit, setEdit ] = useState(false)

    const handleSubmitEdit = (data, { resetForm, setSubmitting }) => {
        dispatch(editSubCategory(sub_category.id, data, resetForm, setSubmitting, setEdit))
    }

    const {
        values, isSubmitting, touched, errors,
        getFieldProps,handleSubmit, handleEditClick, handleBlur
    } = useFieldTitle(sub_category.title, handleSubmitEdit, edit, setEdit)

    const dialogText = `Do you really want to delete the "${sub_category.title}"?`

    const openDeleteSubCategoryDialog = () => {
        dispatch(toggleDeleteSubCategoryDialog(true, dialogText, sub_category.id))
    }

    return (
        <ListItem selected={edit} sx={{ pl: 4 }}>
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
                        variant='standard'
                        fullWidth
                        autoFocus
                        error={ touched.title && Boolean(errors.title) }
                        { ...getFieldProps('title') }
                        onBlur={handleBlur}
                    />
                </form>
                :
                <ListItemText primary={sub_category.title}/>
            }
            {
                edit &&
                <IconButton
                    size='small'
                    disabled={Boolean(errors.title) || values.title == sub_category.title || isSubmitting}
                    onClick={handleSubmit}
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
                onClick={ openDeleteSubCategoryDialog }
                disabled={isSubmitting}
            >
                <DeleteIcon fontSize='small'/>
            </IconButton>
        </ListItem>
    )
}

export default SubCategoryListItem