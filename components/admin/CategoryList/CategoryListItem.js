import { Collapse, IconButton, List, ListItemButton, ListItemText, TextField } from "@mui/material"
import {ExpandLess, ExpandMore} from '@mui/icons-material'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from "react"
import { useRipple } from '../../../app/hooks/useRipple'
import CategorySubListItem from "./CategorySubListItem"
import { useFormik } from "formik"

const CategoryListItem = ({ category }) => {

    const [ripple, events] = useRipple()

    const [open, setOpen] = useState(false)
    const [ edit, setEdit ] = useState(false)

    const { values, handleChange, handleSubmit, submitForm, resetForm } = useFormik({
        initialValues: { title: category.title },
        onSubmit: (data) => {
            console.log(data)
        }
    })

    const handleOpenClick = (e) => {
        if (!edit) setOpen(prev => !prev)
    }
    const handleEditClick = (e) => {
        e.stopPropagation()
        setEdit(prev => !prev)
    }
    const handleBlur = () => {
        if (!ripple) setEdit(false)
        resetForm()
    }
    const handleSubmitClick = async () => {
        await submitForm() 
        resetForm()
        setEdit(false)
    }

    return (
        <>
            <ListItemButton
                selected={open || edit}
                disableRipple={ripple}
                onClick={ handleOpenClick }
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
                    <ListItemText primary={category.title}/>
                }
                {
                    category.title != values.title &&
                    <IconButton
                        size='small'
                        onClick={ handleSubmitClick }
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
                { category.sub_categories && (open ? <ExpandLess /> : <ExpandMore />) }
            </ListItemButton>
            {
                category.sub_categories &&
                <Collapse in={open} key={category.id} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            category.sub_categories.map(sub_category => (
                                <CategorySubListItem key={sub_category.id} sub_category={sub_category}/>
                            ))
                        }
                    </List>
                </Collapse>
            }
        </>
    )
}

export default CategoryListItem