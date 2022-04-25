import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import EditProfileForm from "../forms/EditProfileForm"
import ConfirmDialog from "./ConfirmDialog"
import { useDispatch, useSelector } from "react-redux"
import { deleteUserImage } from "../../app/store/actions/async/user"
import { toggleDeleteProfileImageDialog, toggleEditProfileDialog } from "../../app/store/actions/dialogActions"

const EditProfileDialog = () => {

    const dispatch = useDispatch()
    const user_id = useSelector(state => state.user.id)

    const {
        loading, text, image_id,
        deleteProfileImageDialog, editProfileDialog
    } = useSelector(state => state.dialog)

    const closeEditProfileDialog = () => {
        dispatch(toggleEditProfileDialog(false))
    }
    const closeDeleteProfileImageDialog = () => {
        dispatch(toggleDeleteProfileImageDialog(false, null, null))
    }
    const handleDeleteImageClick = () => {
        dispatch(deleteUserImage(user_id, image_id))
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
                    open={deleteProfileImageDialog}
                    content={text}
                    loading={loading}
                    handleCancelClick={closeDeleteProfileImageDialog}
                    handleConfirmClick={handleDeleteImageClick}
                />
            </DialogContent>
        </Dialog>
    )
}

export default EditProfileDialog