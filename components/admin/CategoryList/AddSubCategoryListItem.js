import { Box, CircularProgress, IconButton, ListItem, ListItemText, TextField } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import SaveIcon from '@mui/icons-material/Save'
import { useState } from "react"
import { useFormik } from "formik"
import { titleValidationSchema } from "../../../app/hooks/useFormik/validate"
import { useRipple } from "../../../app/hooks/useRipple"
import { useDispatch } from "react-redux"
import { createSubCategory } from "../../../app/store/actions/async/admin"

const AddSubCategoryListItem = ({ category_id }) => {

    const dispatch = useDispatch()

    const [ripple, events] = useRipple()
    const [edit, setEdit] = useState(false)

    const { touched, errors, isValid, isSubmitting, handleSubmit, getFieldProps, resetForm, submitForm } = useFormik({
        initialValues: {
            title: ''
        },
        validationSchema: titleValidationSchema,
        onSubmit: (data, {resetForm, setSubmitting}) => {
            dispatch(createSubCategory(category_id, data, resetForm, setSubmitting, setEdit))
        }
    })

    const handleEditClick = () => {
        resetForm()
        setEdit(prev => !prev)
    }
    const handleBlur = () => {
        if (!ripple) setEdit(false)
    }
    const handleSubmitClick = async () => {
        await submitForm()
    }

    return (
        <ListItem sx={{ pl: 4, alignItems: 'flex-start' }}>
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
                        helperText={ (touched.title && errors.title) || ' ' }
                        { ...getFieldProps('title') }
                        onBlur={handleBlur}
                    />
                </form>
                :
                <ListItemText primary='Add Sub Category'/>
            }
            {
                edit && isValid &&
                <IconButton
                    size='small'
                    onClick={handleSubmitClick}
                    disabled={isSubmitting}
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