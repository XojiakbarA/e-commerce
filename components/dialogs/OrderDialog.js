import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"


const OrderDialog = () => {

    const router = useRouter()
    const orderDialog = useSelector(state => state.toggle.orderDialog)

    const handlePay = () => {
        router.push('/')
    }
    const handleBrowse = () => {
        router.push('/')
    }

    return (
        <Dialog open={ orderDialog }>
            <DialogTitle>
                Your order is completed
            </DialogTitle>
            <DialogContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Image src='/images/logo/checked.png' width={100} height={100} alt="complete" />
                <DialogContentText width={350} textAlign='center'>
                    You can track the status of your order in your personal account.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handlePay} variant="contained">Pay</Button>
                <Button onClick={handleBrowse}>Browse Products</Button>
            </DialogActions>
        </Dialog>
    )
}

export default OrderDialog