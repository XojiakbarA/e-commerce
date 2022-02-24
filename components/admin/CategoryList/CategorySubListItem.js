import { IconButton, ListItem, ListItemText, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from "react"
import { useRipple } from "../../../app/hooks/useRipple"
import { useFormik } from "formik"

const CategorySubListItem = ({ sub_category }) => {

    const [ripple, events] = useRipple()

    const [ edit, setEdit ] = useState(false)

    const { values, handleChange, handleSubmit, submitForm, resetForm } = useFormik({
        initialValues: { title: sub_category.title },
        onSubmit: (data) => {
            console.log(data)
        }
    })

    const handleEditClick = (e) => {
        e.stopPropagation()
        setEdit(prev => !prev)
    }
    const handleBlur = () => {
        if (!ripple){
            setEdit(false)
            resetForm()
        }
    }
    const handleSubmitClick = async () => {
        await submitForm()
        resetForm()
        setEdit(false)
    }

    return (
        <ListItem
            selected={edit}
            sx={{ pl: 4 }}
        >
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
                    sub_category.title != values.title
                    ?
                    <IconButton
                        size='small'
                        onClick={handleSubmitClick}
                        { ...events }
                    >
                        <SaveIcon fontSize='small'/>
                    </IconButton>
                    :
                    <IconButton
                        size='small'
                        onClick={handleEditClick}
                        { ...events }
                    >
                        <EditIcon fontSize='small'/>
                    </IconButton>
                }
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