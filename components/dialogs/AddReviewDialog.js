import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { useToggle } from "../../app/hooks/useToggle"
import ReviewForm from '../forms/ReviewForm'

const AddReviewDialog = () => {

    const { addReviewDialog, closeAddReviewDialog } = useToggle()

    const { isOpen, payload } = addReviewDialog

    return (
        <Dialog open={isOpen} onClose={closeAddReviewDialog}>
            <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="button">
                    Write a Review
                </Typography>
                <IconButton onClick={closeAddReviewDialog}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <ReviewForm product_id={payload}/>
            </DialogContent>
        </Dialog>
    )
}

export default AddReviewDialog