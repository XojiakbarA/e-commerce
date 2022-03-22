import { Dialog, Typography, IconButton, DialogTitle, DialogContent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LoginForm from '../forms/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLoginDialog, toggleRegisterDialog } from '../../app/store/actions/dialogActions'

const LoginDialog = () => {

    const dispatch = useDispatch()

    const { loginDialog } = useSelector(state => state.dialog)

    const closeLoginDialog = () => {
        dispatch(toggleLoginDialog(false))
    }

    return(
        <Dialog open={loginDialog} onClose={ closeLoginDialog }>
            <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="button">
                    Login
                </Typography>
                <IconButton onClick={closeLoginDialog}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
                <DialogContent sx={{marginX: 7, marginY: 3, width: 300}}>
                    <LoginForm/>
                </DialogContent>
        </Dialog>
    )
}

export default LoginDialog