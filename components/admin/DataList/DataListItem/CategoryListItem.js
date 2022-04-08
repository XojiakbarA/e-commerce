import { Box, CircularProgress, Collapse, IconButton, List, ListItemButton, ListItemText, TextField } from "@mui/material"
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import AddListItem from "./AddListItem"
import CustomListItem from "./ListItem"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useSingleField } from "../../../../app/hooks/useFormik/useSingleField"
import { createSubCategory, editCategory, editSubCategory } from "../../../../app/store/actions/async/admin"
import { toggleDeleteCategoryDialog, toggleDeleteSubCategoryDialog } from "../../../../app/store/actions/dialogActions"
import { titleValidationSchema } from "../../../../app/hooks/useFormik/validate"


const CategoryListItem = ({ category }) => {

    const dispatch = useDispatch()

    const [ catEdit, setCatEdit ] = useState(false)

    const handleCatEditSubmit = (data, { resetForm, setSubmitting }) => {
        dispatch(editCategory(category.id, data, resetForm, setSubmitting, setCatEdit))
    }

    const {
        open, ripple, values, isSubmitting, events, touched, errors,
        getFieldProps, handleSubmit, handleOpenClick, handleEditClick, handleBlur
    } = useSingleField('title', category.title, handleCatEditSubmit, titleValidationSchema, catEdit, setCatEdit)

    const dialogText = `Do you really want to delete the "${category.title}"?`

    const openDeleteCategoryDialog = (e) => {
        e.stopPropagation()
        dispatch(toggleDeleteCategoryDialog(true, dialogText, category.id))
    }

    const [subCatCreate, setSubCatCreate] = useState(false)

    const handleSubCatCreateSubmit = (data, {resetForm, setSubmitting}) => {
        dispatch(createSubCategory(category.id, data, resetForm, setSubmitting, setSubCatCreate))
    }

    const subCatFormik = useSingleField('title', null, handleSubCatCreateSubmit, titleValidationSchema, subCatCreate, setSubCatCreate)

    const handleSubCatEditSubmit = (id, data, resetForm, setSubmitting, setEdit) => {
        dispatch(editSubCategory(id, data, resetForm, setSubmitting, setEdit))
    }
    const openDeleteSubCategoryDialog = (dialogText, id) => {
        dispatch(toggleDeleteSubCategoryDialog(true, dialogText, id))
    }

    return (
        <>
            <ListItemButton
                selected={open || catEdit}
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
                    catEdit
                    ?
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            autoFocus
                            variant='standard'
                            placeholder='Category Title'
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
                    catEdit &&
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
                    {catEdit ? <EditOffIcon fontSize='small'/> : <EditIcon fontSize='small'/>}
                </IconButton>
                <IconButton
                    size='small'
                    onClick={ openDeleteCategoryDialog }
                    disabled={isSubmitting}
                    { ...events }
                >
                    <DeleteIcon fontSize='small'/>
                </IconButton>
                { category.sub_categories && (open ? <ExpandLessIcon /> : <ExpandMoreIcon />) }
            </ListItemButton>
            {
                category.sub_categories &&
                <Collapse in={open} key={category.id} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            category.sub_categories.map(sub_category => (
                                <CustomListItem
                                    key={sub_category.id}
                                    item={sub_category}
                                    field='title'
                                    placeholder='Sub Category Title'
                                    handleSubmitEdit={handleSubCatEditSubmit}
                                    validationSchema={titleValidationSchema}
                                    openDeleteDialog={openDeleteSubCategoryDialog}
                                />
                            ))
                        }
                        <AddListItem
                            formik={subCatFormik}
                            edit={subCatCreate}
                            placeholder='Sub Category Title'
                            listItemText='Add Sub Category'
                            listItemStyle={{ pl: 4, alignItems: 'flex-start' }}
                            field='title'
                        />
                    </List>
                </Collapse>
            }
        </>
    )
}

export default CategoryListItem