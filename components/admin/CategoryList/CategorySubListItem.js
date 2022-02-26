import { Box, CircularProgress, IconButton, ListItem, ListItemText, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from "react"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { editSubCategory } from '../../../app/store/actions/async/admin'

const CategorySubListItem = ({ sub_category }) => {

    const dispatch = useDispatch()

    const [ edit, setEdit ] = useState(false)

    const { values, isSubmitting, handleChange, handleSubmit, resetForm, submitForm } = useFormik({
        initialValues: { title: sub_category.title },
        onSubmit: (data, {resetForm, setSubmitting}) => {
            if (values.title == sub_category.title) {
                setSubmitting(false)
                return
            }
            dispatch(editSubCategory(sub_category.id, data, resetForm, setSubmitting, setEdit))
        },
        enableReinitialize: true
    })

    const handleEditClick = (e) => {
        resetForm()
        setEdit(prev => !prev)
    }
    const handleBlur = () => {
        setEdit(false)
    }
    const handleSubmitClick = async () => {
        await submitForm()
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
                        value={values.title}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name='title'
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
                disabled={isSubmitting}
            >
                <DeleteIcon fontSize='small'/>
            </IconButton>
        </ListItem>
    )
}

export default CategorySubListItem