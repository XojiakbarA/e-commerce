import { IconButton, ListItem, ListItemText, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from "react"
import { useFormik } from "formik"
import { useRipple } from "../../../app/hooks/useRipple"

const BrandListItem = ({ brand }) => {

    const [edit, setEdit] = useState(false)
    const [ripple, events] = useRipple()

    const { values, handleSubmit, handleChange, resetForm, submitForm } = useFormik({
        initialValues: {
            title: brand.title
        },
        onSubmit: (data) => {
            console.log(data)
        }
    })

    const handleEditClick = () => {
        setEdit(prev => !prev)
    }
    const handleBlur = () => {
        if (!ripple) {
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
        <ListItem>
            {
                edit
                ?
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        autoFocus
                        size='small'
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
                values.title != brand.title &&
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
            >
                {edit ? <EditOffIcon fontSize='small'/> : <EditIcon fontSize='small'/>}
            </IconButton>
            <IconButton
                size='small'
            >
                <DeleteIcon fontSize='small'/>
            </IconButton>
        </ListItem>
    )
}

export default BrandListItem