import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { useSelector } from "react-redux"
import { useToggle } from "../../app/hooks/useToggle"
import ProductNuller from './ProductNuller'
import ProductDetails from "../product/ProductDetails/ProductDetails"

const ViewProductDialog = () => {

    const product = useSelector(state => state.product)

    const { viewProductDialog, closeViewProductDialog } = useToggle()

    return (
        <Dialog open={viewProductDialog} onClose={closeViewProductDialog} fullWidth maxWidth='lg'>
            <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="button">
                    View Product
                </Typography>
                <IconButton onClick={closeViewProductDialog}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <ProductNuller/>
                <ProductDetails product={product}/>
            </DialogContent>
        </Dialog>
    )
}

export default ViewProductDialog