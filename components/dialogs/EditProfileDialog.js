import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { useToggle } from "../../app/hooks/useToggle"
import EditProfileForm from "../forms/EditProfileForm"
import ConfirmDialog from "./ConfirmDialog"
import { useDispatch } from "react-redux"
import { deleteUserImage } from "../../app/store/actions/async/user"

const EditProfileDialog = () => {

    const dispatch = useDispatch()

    const {
        isLoading, editProfileDialog, closeEditProfileDialog,
        deleteProfileImageDialog, closeDeleteProfileImageDialog
    } = useToggle()

    const { isOpen, text, payload } = deleteProfileImageDialog

    const handleDeleteImage = () => {
        dispatch(deleteUserImage(payload))
    }

    return (
        <Dialog open={editProfileDialog} onClose={closeEditProfileDialog}>
            <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="button">
                    Edit Profile
                </Typography>
                <IconButton onClick={closeEditProfileDialog}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{marginX: 7, width: 300}}>
                <EditProfileForm/>
                <ConfirmDialog
                    open={isOpen}
                    content={text}
                    loading={isLoading}
                    handleCancelClick={closeDeleteProfileImageDialog}
                    handleConfirmClick={handleDeleteImage}
                />
            </DialogContent>
        </Dialog>
    )
}

export default EditProfileDialog