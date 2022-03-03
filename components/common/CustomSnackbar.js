import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSnackbar } from '../../app/store/actions/actionCreators'

const CustomSnackbar = () => {

    const dispatch = useDispatch()

    const { open, text, color } = useSelector(state => state.toggle.snackbar)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        dispatch(toggleSnackbar(false, ''))
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert
                severity={color}
                variant='standard'
                elevation={6}
                color={color}
                onClose={handleClose}
            >
                { text }
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackbar