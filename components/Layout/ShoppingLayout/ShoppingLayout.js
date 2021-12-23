import { Grid } from "@mui/material"
import ShoppingInfo from "./ShoppingInfo/ShoppingInfo"
import ShoppingStep from "./ShoppingStep"

const ShoppingLayout = ({children}) => {

    return (
        <Grid container spacing={2}>
            <Grid item lg={8}>
                <ShoppingStep />
            </Grid>
            {children}
            <Grid item lg={4}>
                <ShoppingInfo />
            </Grid>
        </Grid>
    )
}

export default ShoppingLayout