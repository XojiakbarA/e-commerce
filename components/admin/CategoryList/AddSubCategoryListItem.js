import { Box, CircularProgress, IconButton, ListItem, ListItemText, TextField } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import SaveIcon from '@mui/icons-material/Save'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { createSubCategory } from "../../../app/store/actions/async/admin"
import { useFieldTitle } from "../../../app/hooks/useFormik/useFieldTitle"

const AddSubCategoryListItem = ({ category_id }) => {

    const dispatch = useDispatch()

    const [edit, setEdit] = useState(false)

    const handleSubmitCreate = (data, {resetForm, setSubmitting}) => {
        dispatch(createSubCategory(category_id, data, resetForm, setSubmitting, setEdit))
    }

    const {
        events, touched, errors, values, isSubmitting,
        handleSubmit, getFieldProps, handleEditClick, handleBlur
    } = useFieldTitle(null, handleSubmitCreate, edit, setEdit)

    return (
        <ListItem sx={{ pl: 4, alignItems: 'flex-start' }} selected={edit}>
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
                        placeholder='Sub Category Title'
                        error={ touched.title && Boolean(errors.title) }
                        { ...getFieldProps('title') }
                        onBlur={handleBlur}
                    />
                </form>
                :
                <ListItemText primary='Add Sub Category'/>
            }
            {
                edit &&
                <IconButton
                    size='small'
                    onClick={handleSubmit}
                    disabled={Boolean(errors.title) || !values.title || isSubmitting}
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
                {edit ? <RemoveCircleIcon fontSize='small'/> : <AddCircleIcon fontSize='small'/>}
            </IconButton>
        </ListItem>
    )
}

export default AddSubCategoryListItem