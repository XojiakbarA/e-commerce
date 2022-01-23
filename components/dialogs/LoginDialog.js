import { Dialog, Typography, IconButton, DialogTitle, DialogContent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LoginForm from '../forms/LoginForm'
import { useToggle } from '../../app/hooks/useToggle'

const LoginDialog = () => {

    const { loginDialog, closeLoginDialog } = useToggle()

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