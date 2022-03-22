import { List, ListSubheader, Paper } from "@mui/material"
import BrandListItem from "./BrandListItem"
import AddBrandListItem from "./AddBrandListItem"
import { useDispatch } from "react-redux"

const BrandList = ({ brands }) => {

    return (
        <Paper>
            <List>
                <ListSubheader>Brands</ListSubheader>
                {
                    brands.map(brand => (
                        <BrandListItem key={brand.id} brand={brand}/>
                    ))
                }
                <AddBrandListItem/>
            </List>
        </Paper>
    )
}

export default BrandList