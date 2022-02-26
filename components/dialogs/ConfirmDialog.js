import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {cancelOrder} from "../../app/store/actions/async/user"
import { useToggle } from "../../app/hooks/useToggle"

const ConfirmDialog = ({ loading, handleConfirmClick }) => {

    // const dispatch = useDispatch()
    // const isLoading = useSelector(state => state.toggle.isLoading)
    // const orderShop = useSelector(state => state.orderShop)
    // const handleCancelOrder = () => {
    //     dispatch(cancelOrder(orderShop.id))
    // }

    const { confirmDialog, closeConfirmDialog } = useToggle()
    const { isOpen, text } = confirmDialog

    return (
        <Dialog open={isOpen} onClose={closeConfirmDialog} maxWidth='xs' fullWidth={true}>
            <DialogTitle>
                <Typography variant="button">
                    Delete
                </Typography>
                {loading && <CircularProgress size={25} sx={{position: 'absolute', top: 15, right: 20}}/>}
            </DialogTitle>
            <DialogContent>
                <DialogContentText height={40}>
                    {text}
                    {/* {`Are you sure you want to cancel the "${orderShop.title}" order?`} */}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeConfirmDialog} disabled={loading}>No</Button>
                <Button onClick={handleConfirmClick} disabled={loading}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog