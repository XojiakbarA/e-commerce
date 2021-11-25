import { ListSubheader, Box, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { useSelector } from "react-redux"

const BrandList = () => {

    const brands = useSelector(state => state.brands)

    return(
        <Box sx={{marginTop: 2}}>
            <ListSubheader component="div">
                Brands
            </ListSubheader>
            <FormGroup>
                {
                    brands.map((brand, i) => (
                        <FormControlLabel key={i} control={<Checkbox />} label={brand.title} />
                    ))
                }
            </FormGroup>
        </Box>
    )
}

export default BrandList