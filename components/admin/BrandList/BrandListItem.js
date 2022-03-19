import { Box, CircularProgress, IconButton, ListItem, ListItemText, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import { editBrand } from "../../../app/store/actions/async/admin"
import { useBrand } from "../../../app/hooks/useFormik/useBrand"
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const BrandListItem = ({ brand }) => {

    const dispatch = useDispatch()

    const [edit, setEdit] = useState(false)

    const handleSubmitEdit = (data, { resetForm, setSubmitting }) => {
        dispatch(editBrand(brand.id, data, resetForm, setSubmitting, setEdit))
    }

    const {
        events, values, isSubmitting, touched, errors, getFieldProps,
        handleSubmit, handleEditClick, handleSubmitClick, handleBlur, handleDeleteClick
    } = useBrand(brand, handleSubmitEdit, setEdit)

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
                    onClick={ handleSubmitClick }
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
                onClick={handleDeleteClick}
                disabled={isSubmitting}
            >
                <DeleteIcon fontSize='small'/>
            </IconButton>
        </ListItem>
    )
}

export default BrandListItem