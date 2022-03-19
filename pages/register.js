import { Grid, Paper, Stack, Typography } from "@mui/material"
import RegisterForm from "../components/forms/RegisterForm"
import { wrapper } from "../app/store"
import MainLayout from "../components/layout/MainLayout"

const Register = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}/>
            <Grid item xs={4}>
                <Paper sx={{paddingX: 5, paddingY: 7}} elevation={3}>
                    <Stack spacing={3}>
                        <Typography variant="h4">
                            Register
                        </Typography>
                        <RegisterForm/>
                    </Stack>
                </Paper>
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async () => {

    

})

export default Register

Register.getLayout = (page) => {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}