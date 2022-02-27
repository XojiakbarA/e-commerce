import { List, ListSubheader, Paper } from "@mui/material"
import { useSelector } from "react-redux"
import { useEditSubCategory } from "../../../app/hooks/useFormik/useEditSubCategory"
import { useToggle } from "../../../app/hooks/useToggle"
import ConfirmDialog from "../../dialogs/ConfirmDialog"
import AddCategoryListItem from "./AddCategoryListItem"
import CategoryListItem from "./CategoryListItem"

const CategoryList = ({ categories }) => {

    const { text, payload } = useSelector(state => state.toggle.dialogContent)

    const { deleteSubCategoryDialog, closeDeleteSubCategoryDialog } = useToggle()

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
                open={deleteSubCategoryDialog}
                content={text}
                loading={isSubmitting}
                handleCancelClick={closeDeleteSubCategoryDialog}
                handleConfirmClick={handleDeleteClick}
            />
        </Paper>
    )
}

export default CategoryList