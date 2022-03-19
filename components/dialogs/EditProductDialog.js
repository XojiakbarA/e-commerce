import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { useToggle } from "../../app/hooks/useToggle"
import ProductForm from "../forms/ProductForm"
import { appendToFormData } from "../../utils/utils"
import { editProduct } from "../../app/store/actions/async/vendor"
import { useDispatch } from "react-redux"

const EditProductDialog = () => {

    const dispatch = useDispatch()

    const { editProductDialog, closeEditProductDialog } = useToggle()

    const { isOpen, payload } = editProductDialog

    const handleSubmit = (data, {setSubmitting}) => {
        const formData = appendToFormData(data)
        dispatch(editProduct(payload.id, formData, setSubmitting))
    }

    return (
        <Dialog open={isOpen} onClose={closeEditProductDialog} fullWidth maxWidth='lg'>
            <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="button">
                    Edit Product
                </Typography>
                <IconButton onClick={closeEditProductDialog}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{marginY: 2}}>
                    <ProductForm onSubmit={handleSubmit} product={payload}/>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default EditProductDialog