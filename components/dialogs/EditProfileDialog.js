import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { useToggle } from "../../app/hooks/useToggle"
import { useEditProfile } from "../../app/hooks/useFormik/useEditProfile"
import EditProfileForm from "../forms/EditProfileForm"

const EditProfileDialog = () => {

    const { editProfileDialog, closeEditProfileDialog } = useToggle()

    const { setFieldValue, setPreview } = useEditProfile()

    return (
        <Dialog open={editProfileDialog} onClose={e => closeEditProfileDialog(setPreview, setFieldValue)}>
            <DialogTitle sx={{display: 'flex', alignItems: 'end', justifyContent: 'space-between'}}>
                <Typography variant="button">
                    Edit Profile
                </Typography>
                <IconButton onClick={e => closeEditProfileDialog(setPreview, setFieldValue)}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{marginX: 7, marginY: 3, width: 300}}>
                <EditProfileForm/>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfileDialog