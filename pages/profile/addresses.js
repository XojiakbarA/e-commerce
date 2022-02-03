import { Stack } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AddIcon from '@mui/icons-material/Add'
import ProfileLayout from '../../components/layout/ProfileLayout/ProfileLayout'
import PageTitle from '../../components/common/PageTitle'
import ProfileRowCard from '../../components/profile/ProfileRowCard'
import { wrapper } from '../../app/store'

const Addresses = () => {
    return (
        <ProfileLayout>
            <PageTitle
                title='My Addresses'
                titleIcon={<LocationOnIcon fontSize='large' />}
                buttonText='Add New Address'
                buttonIcon={<AddIcon />}
            />
            <Stack spacing={2}>
                <ProfileRowCard
                    col1='Ralf Edward'
                    col2='777 Brockton Avenue, Abington MA 2351'
                    col3='+1927987987498'
                />
                <ProfileRowCard
                    col1='Ralf Edward'
                    col2='777 Brockton Avenue, Abington MA 2351'
                    col3='+1927987987498'
                />
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

export default Addresses