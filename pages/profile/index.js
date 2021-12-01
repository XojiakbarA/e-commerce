import { Grid, Stack } from "@mui/material"
import UserInfoTable from "../../components/profile/UserInfoTable"
import UserInfoGrid from "../../components/profile/UserInfoGrid"
import ProfileSidebar from "../../components/profile/ProfileSidebar/ProfileSidebar"
import ProfileTitle from "../../components/profile/ProfileTitle"


const Profile = () => {
    return (
        <>
            <Grid container spacing={2}>
                <ProfileSidebar />
                <Grid item lg={9}>
                    <Stack spacing={3}>
                        <ProfileTitle />
                        <UserInfoGrid />
                        <UserInfoTable />
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default Profile