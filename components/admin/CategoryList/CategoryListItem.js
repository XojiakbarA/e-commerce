import { CircularProgress, Collapse, IconButton, List, ListItemButton, ListItemText, TextField } from "@mui/material"
import {ExpandLess, ExpandMore} from '@mui/icons-material'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from "react"
import { useRipple } from '../../../app/hooks/useRipple'
import CategorySubListItem from "./CategorySubListItem"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { editCategory } from "../../../app/store/actions/async/admin"

const CategoryListItem = ({ category }) => {

    const dispatch = useDispatch()
    const [ripple, events] = useRipple()

    const [open, setOpen] = useState(false)
    const [ edit, setEdit ] = useState(false)

    const { values, isSubmitting, handleChange, handleSubmit, submitForm, resetForm } = useFormik({
        initialValues: { title: category.title },
        onSubmit: (data, {resetForm, setSubmitting}) => {
            if (values.title == category.title) {
                setSubmitting(false)
                return
            }
            dispatch(editCategory(category.id, data, resetForm, setSubmitting))
        },
        enableReinitialize: true
    })

    const handleOpenClick = (e) => {
        if (!edit) setOpen(prev => !prev)
    }
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
                    isSubmitting
                    ?
                    <CircularProgress size={20}/>
                    :
                    (values.title != category.title && values.title != false) &&
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