import { Grid } from '@mui/material'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import ProfileLayout from '../../components/layout/ProfileLayout/ProfileLayout'
import ProfileTitle from '../../components/profile/ProfileTitle'
import { getRegions } from '../../app/store/actions/async/common'
import { wrapper } from '../../app/store'
import CreateShopForm from '../../components/forms/CreateShopForm'

const CreateShop = () => {

    return (
        <ProfileLayout>
            <ProfileTitle
                title='Create Shop'
                titleIcon={<AddBusinessIcon fontSize='large' />}
            />
            <Grid container>
                <Grid item xs={12}>
                    <CreateShopForm/>
                </Grid>
            </Grid>
        </ProfileLayout>
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

    await dispatch(getRegions())

})

export default CreateShop