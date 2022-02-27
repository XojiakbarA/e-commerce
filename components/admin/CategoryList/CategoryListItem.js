import { Box, CircularProgress, Collapse, IconButton, List, ListItemButton, ListItemText, TextField, Tooltip } from "@mui/material"
import {ExpandLess, ExpandMore} from '@mui/icons-material'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import CategorySubListItem from "./CategorySubListItem"
import AddSubCategoryListItem from "./AddSubCategoryListItem"
import { useEditCategory } from "../../../app/hooks/useFormik/useEditCategory"
import { useToggle } from "../../../app/hooks/useToggle"

const CategoryListItem = ({ category }) => {

    const {
        open, edit, ripple, values, isSubmitting, events,
        getFieldProps, handleSubmit, handleOpenClick, handleEditClick,
        handleBlur, handleSubmitClick
    } = useEditCategory(category)

    const { openDeleteCategoryDialog } = useToggle()

    const dialogText = `Do you really want to delete the "${category.title}"?`

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
                            { ...getFieldProps('title') }
                            onBlur={handleBlur}
                            { ...events }
                        />
                    </form>
                    :
                    <ListItemText primary={category.title}/>
                }
                {
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
                    onClick={e => {
                        e.stopPropagation()
                        openDeleteCategoryDialog(dialogText, category)
                    }}
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
                        <AddSubCategoryListItem category_id={category.id}/>
                    </List>
                </Collapse>
            }
        </>
    )
}

export default CategoryListItem