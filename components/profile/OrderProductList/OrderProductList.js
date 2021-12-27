import {CircularProgress, Grid} from "@mui/material";
import OrderProductListItem from "./OrderProductListItem";
import OrderProductListHead from "./OrderProductListHead";

const styles = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 2
}

const OrderProductList = ({products}) => {

    return (
        <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={12}>
                <OrderProductListHead styles={styles}/>
            </Grid>
            {
                products
                    ?
                products.map(product => (
                    <Grid item xs={12} key={product.id}>
                        <OrderProductListItem product={product} styles={styles}/>
                    </Grid>
                ))
                    :
                <Grid item xs={12} display='flex' justifyContent='center'>
                    <CircularProgress/>
                </Grid>
            }
        </Grid>
    )
}

export default OrderProductList