import { Grid } from '@mui/material'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import ProfileLayout from '../../components/layout/ProfileLayout/ProfileLayout'
import { getRegions } from '../../app/store/actions/async/common'
import { wrapper } from '../../app/store'
import CreateShopForm from '../../components/forms/CreateShopForm'
import MainLayout from '../../components/layout/MainLayout'
import ProfilePageHead from '../../components/common/ProfilePageHead'

const CreateShop = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ProfilePageHead
                    title='Create Shop'
                    titleIcon={<AddBusinessIcon fontSize='large' />}
                />
            </Grid>
            <Grid item xs={12}>
                <CreateShopForm/>
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch, getState}) => async () => {

    const user = getState().user
    
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    if (user.shop) {
        return {
            redirect: {
                destination: '/vendor',
                permanent: false
            }
        }
    }

    await dispatch(getRegions())

})

export default CreateShop

CreateShop.getLayout = (page) => {
    return (
        
        <MainLayout>
            <ProfileLayout>
                {page}
            </ProfileLayout>
        </MainLayout>
    )
}