import { Grid, Paper, Stack, Typography } from "@mui/material"
import LoginForm from "../components/forms/LoginForm"
import { wrapper } from "../app/store"
import MainLayout from "../components/layout/MainLayout"

const Login = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}/>
            <Grid item xs={4}>
                <Paper sx={{paddingX: 5, paddingY: 7}} elevation={3}>
                    <Stack spacing={3}>
                        <Typography variant="h4">
                            Login
                        </Typography>
                        <LoginForm/>
                    </Stack>
                </Paper>
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({getState}) => async () => {

    const user = getState().user

    if (user) {
        return {
            redirect: {
                destination: '/profile',
                permanent: false
            }
        }
    }

})

export default Login

Login.getLayout = (page) => {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}