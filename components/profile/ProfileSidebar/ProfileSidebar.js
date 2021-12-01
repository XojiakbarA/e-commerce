import { Grid, Paper, Stack, Divider } from "@mui/material"
import AccountSettings from "./AccountSettings"
import Dashboard from "./Dashboard"

const ProfileSidebar = () => {
    return (
        <Grid item lg={3}>
            <Paper>
                <Stack padding={2} divider={<Divider orientation='horizontal' />}>
                    <Dashboard />
                    <AccountSettings />
                </Stack>
            </Paper>
        </Grid>
    )
}

export default ProfileSidebar