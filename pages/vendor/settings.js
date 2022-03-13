import { Grid } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import ProfileLayout from '../../components/layout/ProfileLayout/ProfileLayout'
import EditShopForm from '../../components/forms/EditShopForm'
import { wrapper } from '../../app/store'
import { getShop } from '../../app/store/actions/async/vendor'
import { getDistricts, getRegions } from '../../app/store/actions/async/common'
import ProfilePageHead from '../../components/common/ProfilePageHead'
import MainLayout from '../../components/layout/MainLayout'

const Settings = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ProfilePageHead
                    title='Settings'
                    titleIcon={<SettingsIcon fontSize='large'/>}
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={12}>
                        <EditShopForm/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch, getState}) => async ({req, query}) => {

    const user = getState().user
    const cookie = req?.headers.cookie
    
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    await dispatch(getShop(cookie))
    await dispatch(getRegions())

    const region_id = getState().shop.data.region.id

    await dispatch(getDistricts(region_id))

})

export default Settings

Settings.getLayout = (page) => {
    return (
        
        <MainLayout>
            <ProfileLayout>
                {page}
            </ProfileLayout>
        </MainLayout>
    )
}