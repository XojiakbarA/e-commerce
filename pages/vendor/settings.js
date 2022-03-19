import { Grid } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import ProfileLayout from '../../components/layout/ProfileLayout/ProfileLayout'
import ShopForm from '../../components/forms/ShopForm'
import { wrapper } from '../../app/store'
import { editShop, getShop } from '../../app/store/actions/async/vendor'
import { getDistricts, getRegions } from '../../app/store/actions/async/common'
import ProfilePageHead from '../../components/common/ProfilePageHead'
import MainLayout from '../../components/layout/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { appendToFormData } from '../../utils/utils'

const Settings = () => {

    const dispatch = useDispatch()

    const shop = useSelector(state => state.shop.data)

    const handleSubmit = (data, { setSubmitting }) => {
        const formData = appendToFormData(data)
        dispatch(editShop(shop.id, formData, setSubmitting))
    }

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
                        <ShopForm onSubmit={handleSubmit} shop={shop}/>
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