import Person from "@mui/icons-material/Person"
import EditIcon from '@mui/icons-material/Edit'
import ProfileLayout from "../../components/layout/ProfileLayout"
import UserInfoTable from "../../components/profile/UserInfoTable"
import UserInfoGrid from "../../components/profile/UserInfoGrid"
import ProfileTitle from "../../components/profile/ProfileTitle"
import { useSelector } from "react-redux"

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
            <UserInfoGrid user={user} />
            <UserInfoTable user={user} />
        </ProfileLayout>
    )
}

export default Profile