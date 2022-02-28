import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useDispatch } from 'react-redux'
import { toggleFormSnackbar } from '../../app/store/actions/actionCreators'

const FormSnackbar = ({ open, text }) => {

    const dispatch = useDispatch()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        dispatch(toggleFormSnackbar(false, ''))
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
            <Alert
                severity="error"
                variant='standard'
                elevation={6}
                color='error'
                onClose={handleClose}
            >
                { text }
            </Alert>
        </Snackbar>
    )
}

export default FormSnackbar