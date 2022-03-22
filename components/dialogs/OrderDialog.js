import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { toggleOrderDialog } from "../../app/store/actions/dialogActions"


const OrderDialog = () => {

    const dispatch = useDispatch()

    const order = useSelector(state => state.order)
    const { orderDialog } = useSelector(state => state.dialog)

    const closeOrderDialog = () => {
        dispatch(toggleOrderDialog(false))
    }

    return (
        <Dialog open={ orderDialog }>
            <DialogTitle>
                <Typography variant="button">
                    {`Order ID ${order.id}.`}
                </Typography>
            </DialogTitle>
            <DialogContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <DialogContentText width={350} textAlign='center'>
                    Your order is completed.
                    You can track the status of your order in your personal account.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeOrderDialog}>Pay</Button>
                <Button onClick={closeOrderDialog}>Browse Products</Button>
            </DialogActions>
        </Dialog>
    )
}

export default OrderDialog