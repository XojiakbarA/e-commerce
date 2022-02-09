import { Grid, Stack } from "@mui/material"
import Person from "@mui/icons-material/Person"
import EditIcon from '@mui/icons-material/Edit'
import ProfileLayout from "../../components/layout/ProfileLayout/ProfileLayout"
import UserInfoTable from "../../components/profile/index/UserInfoTable"
import {useSelector} from "react-redux"
import OrderCountCard from "../../components/profile/index/OrderCountCard"
import UserCard from "../../components/profile/index/UserCard"
import EditProfileDialog from "../../components/dialogs/EditProfileDialog"
import { wrapper } from "../../app/store"
import { useToggle } from "../../app/hooks/useToggle"
import MainLayout from "../../components/layout/MainLayout"
import ProfilePageHead from "../../components/common/ProfilePageHead"

const Profile = () => {

    const user = useSelector(state => state.user)

    const { openEditProfileDialog } = useToggle()

    const orders = [
        { title: 'All Orders', count: user.all_orders_count },
        { title: 'Awaiting Payments', count: user.awaiting_payment_count },
        { title: 'Awaiting Shipment', count: user.awaiting_shipment_count },
        { title: 'Awaiting Delivery', count: user.awaiting_delivery_count }
    ]

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ProfilePageHead
                    title={ user.first_name }
                    titleIcon={ <Person fontSize='large' /> }
                    buttonText={ 'Edit Profile' }
                    buttonIcon={ <EditIcon /> }
                    onClick={ openEditProfileDialog }
                />
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={2}>
                    <Stack direction='row' spacing={2} alignItems='stretch'>
                        <Grid item lg={6}>
                            <UserCard
                                image={user.image}
                                firstName={user.first_name}
                                lastName={user.last_name}
                            />
                        </Grid>
                        <Stack spacing={2} direction='row'>
                            {
                                orders.map(order => (
                                    <OrderCountCard key={order.title} count={order.count} title={order.title}/>
                                ))
                            }
                        </Stack>
                    </Stack>
                    <UserInfoTable user={user} />
                </Stack>
            </Grid>
            <EditProfileDialog/>
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

export default Profile

Profile.getLayout = (page) => {
    return (
        
        <MainLayout>
            <ProfileLayout>
                {page}
            </ProfileLayout>
        </MainLayout>
    )
}