import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {cancelOrder} from "../../redux/actions"
import {useRouter} from "next/router"
import { useToggle } from "../../app/hooks/useToggle"

const ConfirmDialog = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.toggle.isLoading)
    const id = router.query.id

    const { confirmDialog, closeConfirmDialog } = useToggle()

    const handleCancelOrder = () => {
        dispatch(cancelOrder(id))
    }

    return (
        <Dialog open={confirmDialog} onClose={closeConfirmDialog}>
            <DialogTitle>
                <Typography variant="button">
                    Order Cancellation
                </Typography>
                {isLoading && <CircularProgress size={25} sx={{position: 'absolute', top: 15, right: 20}}/>}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to cancel the order?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeConfirmDialog} disabled={isLoading}>No</Button>
                <Button onClick={handleCancelOrder} disabled={isLoading}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog