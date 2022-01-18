import { Alert, Snackbar } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"


const CustomSnackbar = () => {

    const dispatch = useDispatch()
    
    const isOpenSnackbar = useSelector(state => state.snackbar.isOpen)
    const snackbarText = useSelector(state => state.snackbar.text)

    const handleCloseSnackbar = () => dispatch(setSnackbar(false))

    return (
        <Snackbar
            open={isOpenSnackbar}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            onClose={ handleCloseSnackbar }
            autoHideDuration={3000}
        >
            <Alert
                severity='success'
                variant='standard'
                elevation={6}
                color='info'
                onClose={ handleCloseSnackbar }
            >
                {snackbarText}
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackbar