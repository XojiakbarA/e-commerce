import { CircularProgress, IconButton, ListItem, ListItemText, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from "react"
import { useRipple } from "../../../app/hooks/useRipple"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { editSubCategory } from '../../../app/store/actions/async/admin'

const CategorySubListItem = ({ sub_category }) => {

    const dispatch = useDispatch()
    const [ripple, events] = useRipple()

    const [ edit, setEdit ] = useState(false)

    const { values, isSubmitting, handleChange, handleSubmit, submitForm, resetForm } = useFormik({
        initialValues: { title: sub_category.title },
        onSubmit: (data, {resetForm, setSubmitting}) => {
            if (values.title == sub_category.title) {
                setSubmitting(false)
                return
            }
            dispatch(editSubCategory(sub_category.id, data, resetForm, setSubmitting))
        },
        enableReinitialize: true
    })

    const handleEditClick = (e) => {
        e.stopPropagation()
        setEdit(prev => !prev)
        resetForm()
    }
    const handleBlur = () => {
        if (!ripple) setEdit(false)
    }
    const handleSubmitClick = async () => {
        await submitForm()
        setEdit(false)
    }

    return (
        <ListItem selected={edit} sx={{ pl: 4 }}>
            { 
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
                        { ...events }
                    />
                </form>
                :
                <ListItemText
                    sx={{ display: !edit ? 'block' : 'none' }}
                    primary={sub_category.title}
                />
            }
            {
                isSubmitting
                ?
                <CircularProgress size={20}/>
                :
                (values.title != sub_category.title && values.title != false) &&
                <IconButton
                    size='small'
                    onClick={handleSubmitClick}
                    { ...events }
                >
                    <SaveIcon fontSize='small'/>
                </IconButton>
            }
            <IconButton
                size='small'
                onClick={handleEditClick}
                { ...events }
            >
                {edit ? <EditOffIcon fontSize='small'/> : <EditIcon fontSize='small'/>}
            </IconButton>
            <IconButton
                size='small'
                onClick={handleEditClick}
                { ...events }
            >
                <DeleteIcon fontSize='small'/>
            </IconButton>
        </ListItem>
    )
}

export default CategorySubListItem