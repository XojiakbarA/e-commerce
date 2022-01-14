import {Grid} from "@mui/material";
import OrderListHead from "./OrderListHead";
import OrderListItem from "./OrderListItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getOrders} from "../../../../redux/actions";

const styles = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 2
}

const OrderList = () => {

    const dispatch = useDispatch()
    const orders = useSelector(state => state.orders)

    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <OrderListHead styles={styles} />
            </Grid>
            {
                orders.map(order => (
                    <Grid item xs={12} key={order.id}>
                        <OrderListItem order={order} styles={styles}/>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default OrderList