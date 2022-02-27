import { Box, CircularProgress, IconButton, ListItem, ListItemText, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import { useToggle } from "../../../app/hooks/useToggle"
import { useEditSubCategory } from "../../../app/hooks/useFormik/useEditSubCategory"

const CategorySubListItem = ({ sub_category }) => {

    const {
        edit, values, isSubmitting, getFieldProps,handleSubmit,
        handleEditClick, handleBlur, handleSubmitClick
    } = useEditSubCategory(sub_category)

    const { openDeleteSubCategoryDialog } = useToggle()

    const dialogText = `Do you really want to delete the "${sub_category.title}"?`

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
                        { ...getFieldProps('title') }
                        onBlur={handleBlur}
                    />
                </form>
                :
                <ListItemText primary={sub_category.title}/>
            }
            {
                (values.title != sub_category.title && values.title != false) &&
                <IconButton
                    size='small'
                    onClick={handleSubmitClick}
                    disabled={isSubmitting}
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
                onClick={e => openDeleteSubCategoryDialog(dialogText, sub_category)}
                disabled={isSubmitting}
            >
                <DeleteIcon fontSize='small'/>
            </IconButton>
        </ListItem>
    )
}

export default CategorySubListItem