import { Dialog, IconButton, Typography, DialogContent, DialogTitle } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { useToggle } from "../../app/hooks/useToggle"
import RegisterForm from "../forms/RegisterForm"


const RegisterDialog = () => {

    const { registerDialog, closeRegisterDialog } = useToggle()

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