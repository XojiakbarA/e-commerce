import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { useToggle } from "../../app/hooks/useToggle"
import AddProductForm from "../forms/AddProductForm"

const AddProductDialog = () => {

    const { addProductDialog, closeAddProductDialog } = useToggle()

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
                    <AddProductForm/>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default AddProductDialog