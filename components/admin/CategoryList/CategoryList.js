import { List, ListSubheader, Paper } from "@mui/material"
import { useEditSubCategory } from "../../../app/hooks/useFormik/useEditSubCategory"
import { useToggle } from "../../../app/hooks/useToggle"
import ConfirmDialog from "../../dialogs/ConfirmDialog"
import AddCategoryListItem from "./AddCategoryListItem"
import CategoryListItem from "./CategoryListItem"

const CategoryList = ({ categories }) => {

    const { deleteSubCategoryDialog, closeDeleteSubCategoryDialog } = useToggle()

    const { isOpen, text, payload } = deleteSubCategoryDialog

    const { isSubmitting, handleDeleteClick } = useEditSubCategory(payload)

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
                open={isOpen}
                content={text}
                loading={isSubmitting}
                handleCancelClick={closeDeleteSubCategoryDialog}
                handleConfirmClick={handleDeleteClick}
            />
        </Paper>
    )
}

export default CategoryList