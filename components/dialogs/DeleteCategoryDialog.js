import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useEditCategory } from "../../app/hooks/useFormik/useEditCategory"
import { useToggle } from "../../app/hooks/useToggle"
import { deleteProduct } from "../../app/store/actions/async/vendor"
import ProductNuller from "./ProductNuller"

const DeleteCategoryDialog = () => {

    const category = useSelector(state => state.category)

    const { deleteCategoryDialog, closeDeleteCategoryDialog } = useToggle()

    const { isSubmitting, handleDeleteClick } = useEditCategory(category)

    return (
        <Dialog open={deleteCategoryDialog} onClose={closeDeleteCategoryDialog}>
            <DialogTitle>
                <Typography variant="button">
                    Delete Category
                </Typography>
                {isSubmitting && <CircularProgress size={25} sx={{position: 'absolute', top: 15, right: 20}}/>}
            </DialogTitle>
            <DialogContent>
                {`Do you really want to delete the "${category.title}"?`}
                <ProductNuller/>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDeleteCategoryDialog} disabled={isSubmitting}>No</Button>
                <Button onClick={handleDeleteClick} disabled={isSubmitting}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteCategoryDialog