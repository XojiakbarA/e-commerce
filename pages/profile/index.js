import Person from "@mui/icons-material/Person"
import EditIcon from '@mui/icons-material/Edit'
import ProfileLayout from "../../components/layout/ProfileLayout"
import UserInfoTable from "../../components/profile/UserInfoTable"
import UserInfoGrid from "../../components/profile/UserInfoGrid"
import ProfileTitle from "../../components/profile/ProfileTitle"
import { useSelector } from "react-redux"
import {Stack} from "@mui/material";

const Profile = () => {

    const user = useSelector(state => state.user?.data)

    return (
        <ProfileLayout>
            <ProfileTitle
                title={user?.name}
                titleIcon={<Person fontSize='large' />}
                buttonText='Edit Profile'
                buttonIcon={<EditIcon />}
            />
            <Stack spacing={2}>
                <UserInfoGrid user={user} />
                <UserInfoTable user={user} />
            </Stack>
        </ProfileLayout>
    )
}

export default Profile