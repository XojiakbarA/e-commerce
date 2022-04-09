import { Grid, Stack } from '@mui/material'
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'
import MainLayout from '../../components/layout/MainLayout'
import ProfileLayout from '../../components/layout/ProfileLayout/ProfileLayout'
import ProfilePageHead from '../../components/common/ProfilePageHead'
import { wrapper } from '../../app/store'

const SupportTickets = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ProfilePageHead
                    title='Support Tickets'
                    titleIcon={<HeadsetMicIcon fontSize='large' />}
                />
            </Grid>
            <Grid  item xs={12}>
                <Stack spacing={2}>
                    
                </Stack>
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({getState}) => async () => {

    const user = getState().user
    
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

})

export default SupportTickets

SupportTickets.getLayout = (page) => {
    return (
        <MainLayout>
            <ProfileLayout>
                {page}
            </ProfileLayout>
        </MainLayout>
    )
}