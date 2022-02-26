import { List, ListSubheader, Paper } from "@mui/material"
import { useSelector } from "react-redux"
import { useEditCategory } from "../../../app/hooks/useFormik/useEditCategory"
import ConfirmDialog from "../../dialogs/ConfirmDialog"
import AddCategoryListItem from "./AddCategoryListItem"
import CategoryListItem from "./CategoryListItem"

const CategoryList = ({ categories }) => {

    const { payload } = useSelector(state => state.toggle.confirmDialog)

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
                loading={isSubmitting}
                handleConfirmClick={handleDeleteClick}
            />
        </Paper>
    )
}

export default CategoryList