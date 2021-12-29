import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {cancelOrder, toggleConfirmDialog} from "../../../redux/actions";
import {useRouter} from "next/router";

const ConfirmDialog = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const confirmDialog = useSelector(state => state.toggle.confirmDialog)
    const isLoading = useSelector(state => state.toggle.isLoading)
    const id = router.query.id

    const closeConfirmDialog = () => {
        dispatch(toggleConfirmDialog(false))
    }
    const handleCancelOrder = () => {
        dispatch(cancelOrder(id))
    }

    return (
        <Dialog open={confirmDialog} onClose={closeConfirmDialog}>
            <DialogTitle>
                Order Cancellation
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to cancel the order?
                </DialogContentText>
                <Box display='flex' justifyContent='center'>
                    {isLoading && <CircularProgress />}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeConfirmDialog} disabled={isLoading}>No</Button>
                <Button onClick={handleCancelOrder} disabled={isLoading}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog