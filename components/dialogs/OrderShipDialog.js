import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { useToggle } from "../../app/hooks/useToggle"
import { orderShipping } from "../../app/store/actions/async/vendor"

const OrderShipDialog = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.isLoading)

    const { orderShipDialog, closeOrderShipDialog } = useToggle()

    const handleOrderShip = () => {
        dispatch(orderShipping(router.query.id, router.query.order_id))
    }

    return (
        <Dialog open={orderShipDialog} onClose={closeOrderShipDialog}>
            <DialogTitle>
                <Typography variant="button">
                    Order Ship
                </Typography>
                {isLoading && <CircularProgress size={25} sx={{position: 'absolute', top: 15, right: 20}}/>}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to ship the order?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeOrderShipDialog} disabled={isLoading}>No</Button>
                <Button onClick={handleOrderShip} disabled={isLoading}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default OrderShipDialog