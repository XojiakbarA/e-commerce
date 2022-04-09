import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'

const ProductDialog = ({ open, onClose, title, children }) => {

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='lg'>
            <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="button">
                    { title }
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ height: '100vh' }}>
                <Box sx={{marginY: 2}}>
                    { children }
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDialog