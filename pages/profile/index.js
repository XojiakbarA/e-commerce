import Person from "@mui/icons-material/Person"
import EditIcon from '@mui/icons-material/Edit'
import ProfileLayout from "../../components/layout/ProfileLayout"
import UserInfoTable from "../../components/profile/UserInfoTable"
import UserInfoGrid from "../../components/profile/UserInfoGrid"
import ProfileTitle from "../../components/profile/ProfileTitle"


const Profile = () => {
    return (
        <ProfileLayout>
            <ProfileTitle
                title='My Profile'
                titleIcon={<Person fontSize='large' />}
                buttonText='Edit Profile'
                buttonIcon={<EditIcon />}
            />
            <UserInfoGrid />
            <UserInfoTable />
        </ProfileLayout>
    )
}

export default Profile