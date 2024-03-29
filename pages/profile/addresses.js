import { Grid, Stack } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AddIcon from '@mui/icons-material/Add'
import MainLayout from '../../components/layout/MainLayout'
import ProfileLayout from '../../components/layout/ProfileLayout/ProfileLayout'
import ProfilePageHead from '../../components/common/ProfilePageHead'
import ProfileRowCard from '../../components/profile/ProfileRowCard'
import { wrapper } from '../../app/store'

const Addresses = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ProfilePageHead
                    title='My Addresses'
                    titleIcon={<LocationOnIcon fontSize='large' />}
                    buttonText='Add New Address'
                    buttonIcon={<AddIcon />}
                />
            </Grid>
            <Grid  item xs={12}>
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

export default Addresses

Addresses.getLayout = (page) => {
    return (
        <MainLayout>
            <ProfileLayout>
                {page}
            </ProfileLayout>
        </MainLayout>
    )
}