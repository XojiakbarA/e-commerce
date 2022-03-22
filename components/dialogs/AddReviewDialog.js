import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import ReviewForm from '../forms/ReviewForm'
import { useDispatch, useSelector } from 'react-redux'
import { toggleAddReviewDialog } from "../../app/store/actions/dialogActions"

const AddReviewDialog = () => {

    const dispatch = useDispatch()

    const { addReviewDialog } = useSelector(state => state.dialog)

    const closeAddReviewDialog = () => {
        dispatch(toggleAddReviewDialog(false, null))
    }

    return (
        <Dialog open={addReviewDialog} onClose={closeAddReviewDialog}>
            <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="button">
                    Write a Review
                </Typography>
                <IconButton onClick={closeAddReviewDialog}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <ReviewForm/>
            </DialogContent>
        </Dialog>
    )
}

export default AddReviewDialog