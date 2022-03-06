import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { useToggle } from "../../app/hooks/useToggle"
import ProductDetails from "../product/ProductDetails/ProductDetails"

const ViewProductDialog = () => {

    const { viewProductDialog, closeViewProductDialog } = useToggle()

    const { isOpen, payload } = viewProductDialog

    return (
        <Dialog open={isOpen} onClose={closeViewProductDialog} fullWidth maxWidth='lg'>
            <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="button">
                    View Product
                </Typography>
                <IconButton onClick={closeViewProductDialog}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ height: '100vh' }}>
                {isOpen && <ProductDetails product={payload}/>}
            </DialogContent>
        </Dialog>
    )
}

export default ViewProductDialog