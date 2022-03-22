import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import ProductDetails from "../product/ProductDetails/ProductDetails"
import { toggleViewProductDialog } from "../../app/store/actions/dialogActions"
import { useDispatch, useSelector } from "react-redux"

const ViewProductDialog = () => {

    const dispatch = useDispatch()

    const { viewProductDialog, prod_id } = useSelector(state => state.dialog)
    const product = useSelector(state => state.products.data.find(item => item.id === prod_id))

    const closeViewProductDialog = () => {
        dispatch(toggleViewProductDialog(false, null, null))
    }

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
            <DialogContent sx={{ height: '100vh' }}>
                {viewProductDialog && <ProductDetails product={product}/>}
            </DialogContent>
        </Dialog>
    )
}

export default ViewProductDialog