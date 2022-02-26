import { Box, CircularProgress, IconButton, ListItem, ListItemText, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from "react"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { editBrand } from "../../../app/store/actions/async/admin"

const BrandListItem = ({ brand }) => {

    const dispatch = useDispatch()

    const [edit, setEdit] = useState(false)

    const { values, isSubmitting, handleSubmit, handleChange, resetForm, submitForm } = useFormik({
        initialValues: { title: brand.title},
        onSubmit: (data, {resetForm, setSubmitting}) => {
            if (values.title == brand.title) {
                setSubmitting(false)
                return
            }
            dispatch(editBrand(brand.id, data, resetForm, setSubmitting, setEdit))
        },
        enableReinitialize: true,
    })

    const handleEditClick = () => {
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
                        value={values.title}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name='title'
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
                disabled={isSubmitting}
            >
                <DeleteIcon fontSize='small'/>
            </IconButton>
        </ListItem>
    )
}

export default BrandListItem