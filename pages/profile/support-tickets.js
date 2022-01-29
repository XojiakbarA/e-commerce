import { Stack } from '@mui/material'
import ProfileLayout from '../../components/layout/ProfileLayout/ProfileLayout'
import ProfileTitle from '../../components/profile/ProfileTitle'
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'
import { wrapper } from '../../app/store'

const SupportTickets = () => {

    return (
        <ProfileLayout>
            <ProfileTitle
                title='Support Tickets'
                titleIcon={<HeadsetMicIcon fontSize='large' />}
            />
            <Stack spacing={2}>
                
            </Stack>
        </ProfileLayout>
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