import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct, getShopProducts, setProduct, toggleDeleteProductDialog } from "../../redux/actions"


const DeleteProductDialog = () => {

    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.toggle.isLoading)
    const deleteProductDialog = useSelector(state => state.toggle.deleteProductDialog)
    const product = useSelector(state => state.product)

    const closeDeleteProductDialog = () => {
        dispatch(toggleDeleteProductDialog(false))
    }
    const handleDeleteClick = () => {
        dispatch(deleteProduct(product.shop.id, product.id))
    }

    return (
        <Dialog open={deleteProductDialog} onClose={closeDeleteProductDialog}>
            <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="button" fontSize={20}>
                    Delete Product
                </Typography>
                <IconButton onClick={closeDeleteProductDialog}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={4}>
                    <Typography>
                        {`Do you really want to delete the ${product.title}?`}
                    </Typography>
                    <Stack direction='row' spacing={1} justifyContent='end'>
                        <Button variant="outlined" size="small" onClick={closeDeleteProductDialog}>Cancel</Button>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleDeleteClick}
                            endIcon={ isLoading
                                &&
                                <CircularProgress
                                    color='inherit'
                                    size={20}
                                />
                            }
                            disabled={isLoading}
                        >
                            Delete
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteProductDialog