import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import ProductForm from "../forms/ProductForm"
import { appendToFormData } from "../../utils/utils"
import { createProduct } from "../../app/store/actions/async/vendor"
import { useDispatch, useSelector } from "react-redux"
import { toggleAddProductDialog } from "../../app/store/actions/dialogActions"

const AddProductDialog = () => {

    const dispatch = useDispatch()

    const { addProductDialog } = useSelector(state => state.dialog)

    const handleSubmit = (data, { setSubmitting }) => {
        const formData = appendToFormData(data)
        dispatch(createProduct(formData, setSubmitting))
    }

    const closeAddProductDialog = () => {
        dispatch(toggleAddProductDialog(false))
    }

    return (
        <Dialog open={addProductDialog} onClose={closeAddProductDialog} fullWidth maxWidth='lg'>
            <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="button">
                    Add Product
                </Typography>
                <IconButton onClick={closeAddProductDialog}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{marginY: 2}}>
                    <ProductForm onSubmit={handleSubmit}/>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default AddProductDialog