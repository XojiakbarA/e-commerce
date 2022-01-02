import Person from "@mui/icons-material/Person"
import EditIcon from '@mui/icons-material/Edit'
import ProfileLayout from "../../components/layout/ProfileLayout"
import UserInfoTable from "../../components/profile/UserInfoTable"
import UserInfoGrid from "../../components/profile/UserInfoGrid"
import ProfileTitle from "../../components/profile/ProfileTitle"
import {useDispatch, useSelector} from "react-redux"
import {Stack} from "@mui/material";
import {toggleEditProfileDialog} from "../../redux/actions";

const Profile = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user?.data)

    const openEditProfileDialog = () => {
        dispatch(toggleEditProfileDialog(true))
    }

    return (
        <ProfileLayout>
            <ProfileTitle
                title={user?.first_name}
                titleIcon={<Person fontSize='large' />}
                buttonText='Edit Profile'
                buttonIcon={<EditIcon />}
                onClick={openEditProfileDialog}
            />
            <Stack spacing={2}>
                <UserInfoGrid user={user} />
                <UserInfoTable user={user} />
            </Stack>
        </ProfileLayout>
    )
}

export default Profile