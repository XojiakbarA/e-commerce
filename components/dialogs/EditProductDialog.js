import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { useToggle } from "../../app/hooks/useToggle"
import EditProductForm from "../forms/EditProductForm"
import { useEditProduct } from "../../app/hooks/useFormik/useEditProduct"

const EditProductDialog = () => {

    const { editProductDialog, closeEditProductDialog } = useToggle()

    const { setPreview } = useEditProduct()

    return (
        <Dialog open={editProductDialog} onClose={e => closeEditProductDialog(setPreview)} fullWidth maxWidth='lg'>
            <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="button">
                    Edit Product
                </Typography>
                <IconButton onClick={e => closeEditProductDialog(setPreview)}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{marginY: 2}}>
                    <EditProductForm/>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default EditProductDialog