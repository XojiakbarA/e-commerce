import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material"
import Image from "next/image"
import { useToggle } from "../../app/hooks/useToggle"


const OrderDialog = () => {

    const { orderDialog, closeOrderDialog } = useToggle()

    return (
        <Dialog open={ orderDialog }>
            <DialogTitle>
                <Typography variant="button">
                    Your order is completed
                </Typography>
            </DialogTitle>
            <DialogContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Image src='/images/logo/checked.png' width={70} height={70} alt="complete" />
                <DialogContentText width={350} textAlign='center'>
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