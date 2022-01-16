import {CircularProgress, Grid, Pagination} from "@mui/material";
import OrderListHead from "./OrderListHead";
import OrderListItem from "./OrderListItem";

const styles = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 2
}

const OrderList = ({ isFetching, orders, meta, handlePageChange }) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <OrderListHead styles={styles} />
            </Grid>
            {
                isFetching
                ?
                <CircularProgress/>
                :
                orders.map(order => (
                    <Grid item xs={12} key={order.id}>
                        <OrderListItem order={order} styles={styles}/>
                    </Grid>
                ))
            }
            <Grid item xs={12}>
                {
                    meta && meta.last_page > 1 &&
                    <Pagination
                        color="primary"
                        page={meta.current_page}
                        count={meta.last_page}
                        onChange={handlePageChange}
                    />
                }
            </Grid>
        </Grid>
    )
}

export default OrderList