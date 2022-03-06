import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material"

const ConfirmDialog = ({ open, content, loading, handleCancelClick, handleConfirmClick }) => {

    return (
        <Dialog open={open} onClose={handleCancelClick} maxWidth='xs' fullWidth={true}>
            <DialogTitle>
                <Typography variant="button">
                    Delete
                </Typography>
                {loading && <CircularProgress size={25} sx={{position: 'absolute', top: 15, right: 20}}/>}
            </DialogTitle>
            <DialogContent>
                <DialogContentText height={40}>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelClick} disabled={loading}>No</Button>
                <Button onClick={handleConfirmClick} disabled={loading}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog