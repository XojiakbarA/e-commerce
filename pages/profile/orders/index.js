import ProfileLayout from "../../../components/layout/ProfileLayout/ProfileLayout";
import ProfileTitle from "../../../components/profile/ProfileTitle";

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import OrderList from "../../../components/profile/orders/OrderList/OrderList";

const Orders = () => {
    return (
        <ProfileLayout>
            <ProfileTitle
                title='My Orders'
                titleIcon={<ShoppingBagIcon fontSize='large'/>}
            />
            <OrderList />
        </ProfileLayout>
    )
}

export default Orders