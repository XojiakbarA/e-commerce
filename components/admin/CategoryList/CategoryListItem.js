import { Box, CircularProgress, Collapse, IconButton, List, ListItemButton, ListItemText, TextField } from "@mui/material"
import {ExpandLess, ExpandMore} from '@mui/icons-material'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import SubCategoryListItem from "./SubCategoryListItem"
import AddSubCategoryListItem from "./AddSubCategoryListItem"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useFieldTitle } from "../../../app/hooks/useFormik/useFieldTitle"
import { editCategory } from "../../../app/store/actions/async/admin"
import { toggleDeleteCategoryDialog } from "../../../app/store/actions/dialogActions"

const CategoryListItem = ({ category }) => {

    const dispatch = useDispatch()

    const [ edit, setEdit ] = useState(false)

    const handleSubmitEdit = (data, { resetForm, setSubmitting }) => {
        dispatch(editCategory(category.id, data, resetForm, setSubmitting, setEdit))
    }

    const {
        open, ripple, values, isSubmitting, events, touched, errors,
        getFieldProps, handleSubmit, handleOpenClick, handleEditClick, handleBlur
    } = useFieldTitle(category.title, handleSubmitEdit, edit, setEdit)

    const dialogText = `Do you really want to delete the "${category.title}"?`

    const openDeleteCategoryDialog = (e) => {
        e.stopPropagation()
        dispatch(toggleDeleteCategoryDialog(true, dialogText, category.id))
    }

    return (
        <>
            <ListItemButton
                selected={open || edit}
                disableRipple={ripple}
                onClick={ handleOpenClick }
            >
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
                            error={ touched.title && Boolean(errors.title) }
                            { ...getFieldProps('title') }
                            onBlur={handleBlur}
                            { ...events }
                        />
                    </form>
                    :
                    <ListItemText primary={category.title}/>
                }
                {
                    edit &&
                    <IconButton
                        size='small'
                        disabled={Boolean(errors.title) || values.title == category.title || isSubmitting}
                        onClick={ handleSubmit }
                        { ...events }
                    >
                        <SaveIcon fontSize='small'/>
                    </IconButton>
                }
                <IconButton
                    size='small'
                    onClick={handleEditClick}
                    disabled={isSubmitting}
                    { ...events }
                >
                    {edit ? <EditOffIcon fontSize='small'/> : <EditIcon fontSize='small'/>}
                </IconButton>
                <IconButton
                    size='small'
                    onClick={ openDeleteCategoryDialog }
                    disabled={isSubmitting}
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
                                <SubCategoryListItem key={sub_category.id} sub_category={sub_category}/>
                            ))
                        }
                        <AddSubCategoryListItem category_id={category.id}/>
                    </List>
                </Collapse>
            }
        </>
    )
}

export default CategoryListItem