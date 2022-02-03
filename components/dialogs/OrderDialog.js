import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { useToggle } from "../../app/hooks/useToggle"


const OrderDialog = () => {

    const order = useSelector(state => state.order)

    const { orderDialog, closeOrderDialog } = useToggle()

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