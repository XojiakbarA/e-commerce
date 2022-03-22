import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import ProductForm from "../forms/ProductForm"
import { appendToFormData } from "../../utils/utils"
import { editProduct } from "../../app/store/actions/async/vendor"
import { useDispatch, useSelector } from "react-redux"
import { toggleEditProductDialog } from "../../app/store/actions/dialogActions"

const EditProductDialog = () => {

    const dispatch = useDispatch()

    const { editProductDialog, payload } = useSelector(state => state.dialog)
    const product = useSelector(state => state.products.data.find(item => item.id === payload))

    const closeEditProductDialog = () => {
        dispatch(toggleEditProductDialog(false, null, null))
    }
    const handleSubmit = (data, {setSubmitting}) => {
        const formData = appendToFormData(data)
        dispatch(editProduct(payload.id, formData, setSubmitting))
    }

    return (
        <Dialog open={editProductDialog} onClose={closeEditProductDialog} fullWidth maxWidth='lg'>
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
                    <ProductForm onSubmit={handleSubmit} product={product}/>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default EditProductDialog