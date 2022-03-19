import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { useToggle } from "../../app/hooks/useToggle"
import ProductForm from "../forms/ProductForm"
import { appendToFormData } from "../../utils/utils"
import { createProduct } from "../../app/store/actions/async/vendor"
import { useDispatch } from "react-redux"

const AddProductDialog = () => {

    const dispatch = useDispatch()

    const { addProductDialog, closeAddProductDialog } = useToggle()

    const handleSubmit = (data, { setSubmitting }) => {
        const formData = appendToFormData(data)
        dispatch(createProduct(formData, setSubmitting))
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