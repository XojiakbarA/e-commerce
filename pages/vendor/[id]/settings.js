import { Grid } from '@mui/material'
import ProfileLayout from '../../../components/layout/ProfileLayout/ProfileLayout'
import ProfileTitle from '../../../components/profile/ProfileTitle'
import SettingsIcon from '@mui/icons-material/Settings'
import EditShopForm from '../../../components/forms/EditShopForm'
import { wrapper } from '../../../app/store'
import { getShop } from '../../../app/store/actions/async/vendor'
import { getDistricts, getRegions } from '../../../app/store/actions/async/common'

const Settings = () => {

    return (
        <ProfileLayout>
            <ProfileTitle
                title='Settings'
                titleIcon={<SettingsIcon fontSize='large'/>}
            />
            <Grid container>
                <Grid item xs={12}>
                    <EditShopForm/>
                </Grid>
            </Grid>
        </ProfileLayout>
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

    await dispatch(getShop(query.id, cookie))
    await dispatch(getRegions())

    const region_id = getState().shop.data.region.id

    await dispatch(getDistricts(region_id))

})

export default Settings