import { List, ListSubheader, Paper } from "@mui/material"
import { useDispatch } from "react-redux"
import { useFieldTitle } from "../../../app/hooks/useFormik/useFieldTitle"
import { useToggle } from "../../../app/hooks/useToggle"
import { deleteSubCategory } from "../../../app/store/actions/async/admin"
import ConfirmDialog from "../../dialogs/ConfirmDialog"
import AddCategoryListItem from "./AddCategoryListItem"
import CategoryListItem from "./CategoryListItem"

const CategoryList = ({ categories }) => {

    const dispatch = useDispatch()

    const { deleteSubCategoryDialog, closeDeleteSubCategoryDialog } = useToggle()

    const { isOpen, text, payload } = deleteSubCategoryDialog

    const { isSubmitting, setSubmitting } = useFieldTitle()

    const handleDeleteClick = () => {
        dispatch(deleteSubCategory(payload.id, setSubmitting))
    }

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