import { Grid, Stack } from "@mui/material"
import ProfileSidebar from "../../components/profile/ProfileSidebar/ProfileSidebar"

const ProfileLayout = ({children}) => {

    return (
        <>
            <Grid container spacing={2}>
                <ProfileSidebar />
                <Grid item lg={9}>
                    <Stack spacing={3}>
                        {children}
                    </Stack>
                </Grid>
            </Grid>
        </>
    )

}

export default ProfileLayout