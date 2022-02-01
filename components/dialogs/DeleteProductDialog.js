import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useToggle } from "../../app/hooks/useToggle"
import { deleteProduct } from "../../app/store/actions/async/vendor"
import ProductNuller from "./ProductNuller"

const DeleteProductDialog = () => {

    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.toggle.isLoading)
    const product = useSelector(state => state.product)

    const { deleteProductDialog, closeDeleteProductDialog } = useToggle()

    const handleDeleteClick = () => {
        dispatch(deleteProduct(product.shop.id, product.id))
    }

    return (
        <Dialog open={deleteProductDialog} onClose={closeDeleteProductDialog}>
            <DialogTitle>
                <Typography variant="button">
                    Delete Product
                </Typography>
                {isLoading && <CircularProgress size={25} sx={{position: 'absolute', top: 15, right: 20}}/>}
            </DialogTitle>
            <DialogContent>
                {`Do you really want to delete the "${product.title}"?`}
                <ProductNuller/>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDeleteProductDialog} disabled={isLoading}>No</Button>
                <Button onClick={handleDeleteClick} disabled={isLoading}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteProductDialog