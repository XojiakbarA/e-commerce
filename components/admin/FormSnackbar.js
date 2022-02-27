import { forwardRef } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { useDispatch } from 'react-redux'
import { toggleFormSnackbar } from '../../app/store/actions/actionCreators'

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const FormSnackbar = ({ open, text }) => {

    const dispatch = useDispatch()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        dispatch(toggleFormSnackbar(false, ''))
    }

    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                { text }
            </Alert>
        </Snackbar>
    )
}

export default FormSnackbar