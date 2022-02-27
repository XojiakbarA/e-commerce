import { Box, CircularProgress, IconButton, ListItem, ListItemText, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEditBrand } from "../../../app/hooks/useFormik/useEditBrand"
import { useToggle } from "../../../app/hooks/useToggle"

const BrandListItem = ({ brand }) => {

    const {
        edit, values, isSubmitting, getFieldProps, handleSubmit,
        handleEditClick,handleBlur,handleSubmitClick
    } = useEditBrand(brand)

    const { openDeleteBrandDialog } = useToggle()

    const dialogText = `Do you really want to delete the "${brand.title}"?`

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
                        { ...getFieldProps('title') }
                        onBlur={handleBlur}
                    />
                </form>
                :
                <ListItemText primary={brand.title}/>
            }
            {
                (values.title != brand.title && values.title != false) &&
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
                onClick={e => openDeleteBrandDialog(dialogText, brand)}
                disabled={isSubmitting}
            >
                <DeleteIcon fontSize='small'/>
            </IconButton>
        </ListItem>
    )
}

export default BrandListItem