import { List, ListSubheader, Paper } from "@mui/material"
import { useSelector } from "react-redux"
import { useEditCategory } from "../../../app/hooks/useFormik/useEditCategory"
import { useToggle } from "../../../app/hooks/useToggle"
import ConfirmDialog from "../../dialogs/ConfirmDialog"
import AddCategoryListItem from "./AddCategoryListItem"
import CategoryListItem from "./CategoryListItem"

const CategoryList = ({ categories }) => {

    const { text, payload } = useSelector(state => state.toggle.dialogContent)

    const { deleteCategoryDialog, closeDeleteCategoryDialog } = useToggle()

    const { isSubmitting, handleDeleteClick } = useEditCategory(payload)

    return (
        <Paper>
            <List>
                <ListSubheader>Categories</ListSubheader>
                {
                    categories.map(category => (
                        <CategoryListItem key={category.id} category={category}/>
                    ))
                }
                <AddCategoryListItem/>
            </List>
            <ConfirmDialog
                open={deleteCategoryDialog}
                content={text}
                loading={isSubmitting}
                handleCancelClick={closeDeleteCategoryDialog}
                handleConfirmClick={handleDeleteClick}
            />
        </Paper>
    )
}

export default CategoryList