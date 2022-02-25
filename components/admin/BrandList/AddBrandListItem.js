import { IconButton, ListItem, ListItemText, TextField } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import SaveIcon from '@mui/icons-material/Save'
import { useState } from "react"
import { useFormik } from "formik"
import { brandValidationSchema } from "../../../app/hooks/useFormik/validate"

const AddBrandListItem = () => {

    const [open, setOpen] = useState(false)

    const { handleSubmit, getFieldProps, submitForm, resetForm, touched, errors } = useFormik({
        initialValues: {
            title: ''
        },
        validationSchema: brandValidationSchema,
        onSubmit: (data) => {
            console.log(data)
        }
    })

    const handleOpenClick = () => {
        resetForm()
        setOpen(prev => !prev)
    }
    const handleSubmitClick = async () => {
        await submitForm()
        // resetForm()
        // setOpen(false)
    }

    return (
        <ListItem>
            {
                open
                ?
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        autoFocus
                        size='small'
                        variant='standard'
                        placeholder='Brand Title'
                        error={ touched.title && Boolean(errors.title) }
                        helperText={ (touched.title && errors.title) || ' ' }
                        { ...getFieldProps('title') }
                    />
                </form>
                :
                <ListItemText primary='Add Brand'/>
            }
            {
                open &&
                <IconButton
                    size='small'
                    onClick={handleSubmitClick}
                >
                    <SaveIcon fontSize='small'/>
                </IconButton>
            }
            <IconButton
                size='small'
                onClick={handleOpenClick}
            >
                {open ? <RemoveCircleIcon fontSize='small'/> : <AddCircleIcon fontSize='small'/>}
            </IconButton>
        </ListItem>
    )
}

export default AddBrandListItem