import { Grid, Stack } from "@mui/material"
import Person from "@mui/icons-material/Person"
import EditIcon from '@mui/icons-material/Edit'
import ProfileLayout from "../../components/layout/ProfileLayout/ProfileLayout"
import UserInfoTable from "../../components/profile/index/UserInfoTable"
import ProfileTitle from "../../components/profile/ProfileTitle"
import {useDispatch, useSelector} from "react-redux"
import {toggleEditProfileDialog} from "../../redux/actions"
import OrderCountCard from "../../components/profile/index/OrderCountCard"
import UserCard from "../../components/profile/index/UserCard"
import EditProfileDialog from "../../components/profile/index/EditProfileDialog"

const Profile = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user?.data)

    const openEditProfileDialog = () => {
        dispatch(toggleEditProfileDialog(true))
    }

    const orders = [
        { title: 'All Orders', count: user?.all_orders_count },
        { title: 'Awaiting Payments', count: user?.awaiting_payment_count },
        { title: 'Awaiting Shipment', count: user?.awaiting_shipment_count },
        { title: 'Awaiting Delivery', count: user?.awaiting_delivery_count }
    ]

    return (
        <ProfileLayout>
            <ProfileTitle
                title={user?.first_name}
                titleIcon={<Person fontSize='large' />}
                buttonText='Edit Profile'
                buttonIcon={<EditIcon />}
                onClick={openEditProfileDialog}
            />
            <Stack spacing={2}>
                <Stack direction='row' spacing={2} alignItems='stretch'>
                    <Grid item lg={6}>
                        <UserCard
                            image={user?.image}
                            firstName={user?.first_name}
                            lastName={user?.last_name}
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
            <EditProfileDialog/>
        </ProfileLayout>
    )
}

export default Profile