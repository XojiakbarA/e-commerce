import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { useToggle } from "../../app/hooks/useToggle"
import ReviewForm from '../forms/ReviewForm'
import ProductNuller from "./ProductNuller"

const AddReviewDialog = () => {

    const { addReviewDialog, closeAddReviewDialog } = useToggle()

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
                <ProductNuller/>
                <ReviewForm/>
            </DialogContent>
        </Dialog>
    )
}

export default AddReviewDialog