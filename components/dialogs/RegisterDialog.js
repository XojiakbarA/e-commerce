import { Dialog, IconButton, Typography, DialogContent, DialogTitle } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import RegisterForm from "../forms/RegisterForm"
import { useDispatch, useSelector } from "react-redux"
import { toggleRegisterDialog } from "../../app/store/actions/dialogActions"


const RegisterDialog = () => {

    const dispatch = useDispatch()

    const { registerDialog } = useSelector(state => state.dialog)

    const closeRegisterDialog = () => {
        dispatch(toggleRegisterDialog(false))
    }

    return (
        <Dialog open={registerDialog} onClose={ closeRegisterDialog }>
            <DialogTitle sx={{display: 'flex', alignItems: 'end', justifyContent: 'space-between'}}>
                <Typography variant="button" fontSize={20}>
                    Register
                </Typography>
                <IconButton onClick={closeRegisterDialog}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{marginX: 7, marginY: 3, width: 300}}>
                <RegisterForm/>
            </DialogContent>
        </Dialog>
    )
}

export default RegisterDialog