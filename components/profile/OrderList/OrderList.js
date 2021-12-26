import { Grid } from "@mui/material";
import OrderListHead from "./OrderListHead";
import OrderListItem from "./OrderListItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getOrders} from "../../../redux/actions";

const styles = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 2,
    marginBottom: 2
}

const OrderList = () => {

    const dispatch = useDispatch()
    const orders = useSelector(state => state.orders)
    console.log(orders)

    useEffect(() => {
        dispatch(getOrders())
    }, [])

    return (
        <Grid container>
            <OrderListHead styles={styles} />
            {
                orders.map(order => (
                    <OrderListItem key={order.id} order={order} styles={styles}/>
                ))
            }
        </Grid>
    )
}

export default OrderList