import { Grid } from "@mui/material"
import { useState } from "react"

import ShoppingInfo from "../components/ShoppingInfo"
import CheckoutForm from "../components/Form/CheckoutForm"
import ShoppingStep from "../components/ShoppingStep"
import ShoppingLinks from "../components/ShoppingLinks"

const Checkout = () => {

    const [ display, setDisplay ] = useState(true)

    function hideForm() {
        setDisplay(!display)
    }

    return(
        <Grid container spacing={2}>
            <Grid item lg={8}>
                <ShoppingStep />
            </Grid>
            <Grid item lg={8}>
                <CheckoutForm title='Shipping Address' display={true} />
                <CheckoutForm title='Billing Address' display={display} hideForm={hideForm} />
                <ShoppingLinks
                    back={{ title: 'Back to Cart', path: '/cart' }}
                    forward={{ title: 'Proceed to Payment', path: '/payment' }}
                />
            </Grid>
            <Grid item lg={4}>
                <ShoppingInfo />
            </Grid>
        </Grid>
    )
}

export default Checkout